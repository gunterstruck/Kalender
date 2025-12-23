# Code-Review: Monatskalender mit Türchen v1.5.0
**Datum:** 2025-12-23
**Review-Typ:** Umfassende Code-Analyse

---

## 📊 Zusammenfassung

Die Codebase ist **gut strukturiert** und zeigt professionelle Entwicklungspraktiken. Es wurden jedoch **kritische Bugs**, **Performance-Probleme** und **Verbesserungspotenziale** identifiziert.

### Bewertung
- **Architektur:** ⭐⭐⭐⭐ (4/5) - Klare Struktur, gute Trennung
- **Sicherheit:** ⭐⭐⭐⭐ (4/5) - CSP vorhanden, aber Verbesserungen möglich
- **Performance:** ⭐⭐⭐ (3/5) - Memory Leaks und O(n²) Algorithmen
- **Accessibility:** ⭐⭐⭐⭐ (4/5) - Gute ARIA-Labels, aber Details fehlen
- **Code-Qualität:** ⭐⭐⭐⭐ (4/5) - Sauber, aber ohne Type-Safety

---

## 🔴 KRITISCHE BUGS (Sofort beheben!)

### 1. **Storage-Key verwendet falsches Jahr**
**Datei:** `js/app.js:229-230`
**Schweregrad:** 🔴 Kritisch

```javascript
getStorageKey(prefix) {
    return `calendar_${prefix}_${this.currentYear}_${this.selectedMonth}`;
}
```

**Problem:**
- `currentYear` ist immer das **aktuelle Jahr** (via Getter)
- Wenn User December 2024 anschaut (aber es ist 2025), wird falsch gespeichert
- Geöffnete Türchen, Positionen und Quotes gehen verloren beim Jahreswechsel

**Lösung:**
```javascript
getStorageKey(prefix) {
    // Berechne das Jahr basierend auf selectedMonth
    const year = this.getYearForSelectedMonth();
    return `calendar_${prefix}_${year}_${this.selectedMonth}`;
}

getYearForSelectedMonth() {
    const now = new Date();
    const currentMonth = now.getMonth();
    // Wenn selectedMonth > currentMonth, ist es wahrscheinlich letztes Jahr
    // (oder User hat manuell gewechselt - hier besser explizites Jahr speichern)
    return now.getFullYear();
}
```

**Noch besser:** Speichere das Jahr explizit beim Monatswechsel in `this.selectedYear`.

---

### 2. **Memory Leak: Event Listeners werden nicht entfernt**
**Datei:** `js/app.js:747-755`
**Schweregrad:** 🔴 Kritisch

```javascript
renderCalendar() {
    this.calendarGrid.innerHTML = '';  // ❌ Entfernt DOM, aber nicht Event Listeners
    this.doorElements.clear();

    for (let day = 1; day <= daysInMonth; day++) {
        const door = this.createDoorElement(day);  // Neue Event Listener
        this.calendarGrid.appendChild(door);
    }
}
```

**Problem:**
- Jedes Mal wenn `renderCalendar()` aufgerufen wird (Monatswechsel, Shuffle, Date-Change), werden **neue Event Listeners hinzugefügt**
- Die alten Listener werden **nicht entfernt** → Memory Leak
- Nach mehrmaligem Wechseln: Hunderte von Ghost-Listenern

**Lösung 1 (Event Delegation):**
```javascript
init() {
    // Einmal beim Start registrieren
    this.calendarGrid.addEventListener('click', (e) => {
        const door = e.target.closest('.door');
        if (door) {
            const day = parseInt(door.getAttribute('data-day'), 10);
            this.handleDoorClick(day);
        }
    });
}

createDoorElement(day) {
    // ... kein addEventListener mehr nötig
}
```

**Lösung 2 (Cleanup):**
```javascript
renderCalendar() {
    // Entferne alte Listener vor dem Leeren
    this.doorElements.forEach((doorEl) => {
        doorEl.replaceWith(doorEl.cloneNode(true)); // Entfernt alle Listener
    });
    this.calendarGrid.innerHTML = '';
    this.doorElements.clear();
}
```

---

### 3. **isDoorUnlocked() verwendet falsches Jahr**
**Datei:** `js/app.js:214-223`
**Schweregrad:** 🟠 Hoch

```javascript
isDoorUnlocked(day) {
    const selectedMonthDate = new Date(this.currentYear, this.selectedMonth, day);
    // ...
}
```

**Problem:**
- Verwendet `currentYear` statt dem Jahr des ausgewählten Monats
- Wenn User im Januar 2025 den Dezember 2024 anschaut, sind ALLE Türchen gesperrt (weil 31. Dez 2025 noch nicht war)

**Lösung:**
```javascript
isDoorUnlocked(day) {
    // Jahr sollte explizit für selectedMonth gespeichert werden
    const yearForMonth = this.selectedYear || this.currentYear;
    const selectedMonthDate = new Date(yearForMonth, this.selectedMonth, day);
    selectedMonthDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedMonthDate <= today;
}
```

---

## 🟡 BUGS & EDGE CASES

### 4. **Position-Generierung kann fehlschlagen**
**Datei:** `js/app.js:399-418`
**Schweregrad:** 🟡 Mittel

```javascript
while (!validPosition && attempts < maxAttempts) {
    // ...
    attempts++;
}
// Speichere Position (auch wenn nicht perfekt, nach max. Versuchen)
positions.push({ day, x, y });
```

**Problem:**
- Nach 150 Versuchen wird Position gespeichert, **auch wenn ungültig** (x, y könnten undefined sein)
- Bei vielen Türchen (31) können sich Türchen überlappen

**Lösung:**
```javascript
if (!validPosition) {
    console.warn(`Konnte keine valide Position für Tag ${day} finden nach ${attempts} Versuchen`);
    // Fallback: Platziere in Raster
    const gridX = ((day - 1) % 6) * 15 + 5;
    const gridY = Math.floor((day - 1) / 6) * 15 + 5;
    x = gridX;
    y = gridY;
}
```

---

### 5. **Keine Validierung von parseInt-Ergebnissen**
**Datei:** `js/app.js:442`
**Schweregrad:** 🟡 Mittel

```javascript
loadSelectedMonth() {
    const data = localStorage.getItem('calendar_selected_month');
    return data ? parseInt(data, 10) : null;
}
```

**Problem:**
- Wenn LocalStorage korrupt ist ("abc"), gibt parseInt NaN zurück
- NaN !== null → wird als gültiger Monat behandelt

**Lösung:**
```javascript
loadSelectedMonth() {
    const data = localStorage.getItem('calendar_selected_month');
    if (!data) return null;

    const month = parseInt(data, 10);
    if (isNaN(month) || month < 0 || month > 11) {
        console.warn('Ungültiger gespeicherter Monat:', data);
        return null;
    }
    return month;
}
```

---

### 6. **Hardcodierte Locale**
**Datei:** `js/app.js:531`
**Schweregrad:** 🟢 Niedrig

```javascript
const formattedDate = unlockDate.toLocaleDateString('de-DE', { ... });
```

**Problem:**
- Hardcoded auf Deutsch, nicht internationalisierbar

**Lösung:**
```javascript
// In CONFIG hinzufügen
this.CONFIG = {
    LOCALE: 'de-DE',
    // ...
};

// Verwenden
const formattedDate = unlockDate.toLocaleDateString(this.CONFIG.LOCALE, { ... });
```

---

## ⚡ PERFORMANCE-PROBLEME

### 7. **O(n²) Kollisionserkennung**
**Datei:** `js/app.js:406-415`
**Schweregrad:** 🟡 Mittel

```javascript
for (const pos of positions) {
    const dx = Math.abs(x - pos.x);
    const dy = Math.abs(y - pos.y);
    // ...
}
```

**Problem:**
- Für jeden Tag wird gegen alle bisherigen Positionen geprüft
- Bei 31 Tagen: ~465 Vergleiche pro Versuch
- Mit 150 Versuchen: Bis zu 69.750 Operationen

**Lösung:** Spatial Hashing oder Grid-basierte Kollisionserkennung

```javascript
// Alternative: Vorab Grid erstellen
generateDoorPositionsOptimized(daysInMonth) {
    const gridSize = 10; // 10x10 Grid
    const occupied = new Set();
    const positions = [];

    for (let day = 1; day <= daysInMonth; day++) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < this.CONFIG.MAX_POSITION_ATTEMPTS) {
            const x = padding + Math.random() * (100 - doorSize - 2 * padding);
            const y = padding + Math.random() * (100 - doorSize - 2 * padding);

            // Berechne Grid-Zelle
            const gridX = Math.floor(x / gridSize);
            const gridY = Math.floor(y / gridSize);
            const cellKey = `${gridX},${gridY}`;

            // Prüfe nur benachbarte Zellen
            if (!this.isOccupiedNearby(occupied, gridX, gridY, x, y, doorSize, minSpacing)) {
                occupied.add(cellKey);
                positions.push({ day, x, y });
                placed = true;
            }
            attempts++;
        }
    }
    return positions;
}
```

---

### 8. **innerHTML = '' ist langsam**
**Datei:** `js/app.js:690`
**Schweregrad:** 🟢 Niedrig

```javascript
this.calendarGrid.innerHTML = '';
```

**Problem:**
- `innerHTML = ''` parsed den String und triggert Reflow
- Langsamer als direkte DOM-Manipulation

**Lösung:**
```javascript
while (this.calendarGrid.firstChild) {
    this.calendarGrid.removeChild(this.calendarGrid.firstChild);
}
// Oder:
this.calendarGrid.replaceChildren();
```

---

### 9. **setInterval läuft permanent**
**Datei:** `js/app.js:131-157`
**Schweregrad:** 🟢 Niedrig

```javascript
this.dateCheckInterval = setInterval(() => {
    // Prüft jede Minute
}, this.CONFIG.DATE_CHECK_INTERVAL);
```

**Problem:**
- Läuft auch wenn Tab inaktiv ist
- Unnötiger Battery-Drain

**Lösung:**
```javascript
// Verwende Page Visibility API
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(this.dateCheckInterval);
    } else {
        this.startDateChangeDetection();
        // Prüfe sofort beim Wiederkehren
        this.checkDateChange();
    }
});
```

---

## 🔒 SICHERHEIT

### 10. **CSP erlaubt 'unsafe-inline' für Styles**
**Datei:** `index.html:8`
**Schweregrad:** 🟡 Mittel

```html
<meta http-equiv="Content-Security-Policy" content="... style-src 'self' 'unsafe-inline'; ...">
```

**Problem:**
- `unsafe-inline` erlaubt alle Inline-Styles
- Öffnet Tür für Style-Injection Attacks

**Lösung:**
- Verwende Nonce oder Hash für kritische Inline-Styles
- Oder: Verschiebe alle Styles in CSS-Datei

```html
<meta http-equiv="Content-Security-Policy" content="... style-src 'self'; ...">
```

---

### 11. **LocalStorage enthält unverschlüsselte Daten**
**Datei:** `js/app.js` (gesamte Storage-Logik)
**Schweregrad:** 🟢 Niedrig (für diese App)

**Problem:**
- LocalStorage ist unverschlüsselt und lesbar
- Bei sensibleren Daten (User-IDs, etc.) wäre das problematisch

**Empfehlung:**
- Für diese App OK (nur öffentliche Quotes)
- Bei zukünftigen Features: Überlege Verschlüsselung

---

## ♿ ACCESSIBILITY

### 12. **Emoji als Content ohne Alternative**
**Datei:** `js/app.js:734` (und CSS)
**Schweregrad:** 🟡 Mittel

```javascript
infoIcon.innerHTML = 'ℹ️';
```

**Problem:**
- Screen Reader lesen Emoji-Namen vor ("INFORMATION SOURCE")
- Nicht konfigurierbar, nicht übersetzbar

**Lösung:**
```javascript
const infoIcon = document.createElement('div');
infoIcon.className = 'info-icon';
infoIcon.setAttribute('aria-label', 'Bereits geöffnet');
infoIcon.setAttribute('role', 'img');
infoIcon.innerHTML = 'ℹ️';
```

Oder besser: SVG Icons verwenden.

---

### 13. **Fehlende Live-Region Updates**
**Datei:** `js/app.js:677-701`
**Schweregrad:** 🟢 Niedrig

**Problem:**
- Wenn neue Türchen freigeschaltet werden, gibt es keine Ankündigung für Screen Reader

**Lösung:**
```javascript
renderCalendar() {
    // ...

    // Ankündigung für Screen Reader
    const unlockedToday = this.getDoorsUnlockedToday();
    if (unlockedToday > 0) {
        this.announceToScreenReader(`${unlockedToday} neue Türchen verfügbar!`);
    }
}

announceToScreenReader(message) {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'visually-hidden';
    liveRegion.textContent = message;
    document.body.appendChild(liveRegion);

    setTimeout(() => liveRegion.remove(), 1000);
}
```

---

## 📱 PWA & SERVICE WORKER

### 14. **skipWaiting() ohne User-Zustimmung**
**Datei:** `service-worker.js:47`
**Schweregrad:** 🟡 Mittel

```javascript
return self.skipWaiting();
```

**Problem:**
- Neuer Service Worker übernimmt sofort Kontrolle
- Kann zu Inkonsistenzen führen wenn alte Seite noch geladen ist

**Lösung:**
```javascript
// Option 1: Warte bis alle Tabs geschlossen sind (Standard)
// return; // Kein skipWaiting

// Option 2: Frage User
self.addEventListener('install', (event) => {
    // Sende Nachricht an Client
    event.waitUntil(
        self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
                client.postMessage({
                    type: 'UPDATE_AVAILABLE',
                    message: 'Neue Version verfügbar. Jetzt aktualisieren?'
                });
            });
        })
    );
});
```

---

### 15. **Fehlende Offline-Fallback-Seite**
**Datei:** `service-worker.js`
**Schweregrad:** 🟢 Niedrig

**Problem:**
- Wenn User komplett offline ist und Cache fehlt, gibt es keine Fallback-Seite

**Lösung:**
```javascript
const OFFLINE_PAGE = './offline.html';

// Cache offline page bei Install
event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([...CACHE_URLS, OFFLINE_PAGE]);
    })
);

// Fetch: Fallback zu Offline-Page
event.respondWith(
    fetch(request).catch(() => {
        return caches.match(OFFLINE_PAGE);
    })
);
```

---

### 16. **Screenshots fehlen im Manifest**
**Datei:** `manifest.json:33`
**Schweregrad:** 🟢 Niedrig

```json
"screenshots": []
```

**Problem:**
- App Stores (Play Store, etc.) zeigen keine Vorschau
- Bessere User Experience mit Screenshots

**Lösung:**
Erstelle Screenshots und füge hinzu:
```json
"screenshots": [
    {
        "src": "screenshots/screen1.png",
        "sizes": "540x720",
        "type": "image/png"
    }
]
```

---

## 🎨 CODE-QUALITÄT

### 17. **Fehlende Type-Safety**
**Datei:** Alle `.js` Dateien
**Schweregrad:** 🟡 Mittel

**Problem:**
- Keine TypeScript oder JSDoc
- Fehler erst zur Laufzeit erkennbar

**Lösung:**
```javascript
/**
 * Prüft ob ein Türchen freigeschaltet ist
 * @param {number} day - Tag des Monats (1-31)
 * @returns {boolean} True wenn freigeschaltet
 */
isDoorUnlocked(day) {
    // ...
}
```

Oder: Migration zu TypeScript

---

### 18. **Console.log in Production**
**Datei:** `service-worker.js` (mehrere Stellen)
**Schweregrad:** 🟢 Niedrig

```javascript
console.log('[Service Worker] Installing...');
```

**Problem:**
- Console-Output in Production ist unprofessionell
- Kann sensible Infos leaken

**Lösung:**
```javascript
const DEBUG = false; // Oder via Build-Tool

function log(...args) {
    if (DEBUG) console.log(...args);
}

log('[Service Worker] Installing...');
```

---

### 19. **Globale Pollution**
**Datei:** `js/app.js:768-770`
**Schweregrad:** 🟢 Niedrig

```javascript
document.addEventListener('DOMContentLoaded', () => {
    new CalendarApp(); // ❌ Instanz nicht gespeichert
});
```

**Problem:**
- Keine Referenz zur App-Instanz
- Kann nicht von außen zugegriffen oder getestet werden
- `destroy()` Methode kann nicht aufgerufen werden

**Lösung:**
```javascript
window.calendarApp = null;

document.addEventListener('DOMContentLoaded', () => {
    window.calendarApp = new CalendarApp();
});

// Cleanup bei Unload
window.addEventListener('beforeunload', () => {
    if (window.calendarApp) {
        window.calendarApp.destroy();
    }
});
```

---

## ✅ POSITIVE ASPEKTE

### Was läuft gut:

1. ✅ **Saubere Architektur** - Klare Klassenstruktur
2. ✅ **Gute Kommentare** - Code ist gut dokumentiert
3. ✅ **Config-Objekt** - Zentrale Konfiguration
4. ✅ **Responsive Design** - Mobile-First Ansatz
5. ✅ **Accessibility Grundlagen** - ARIA, Keyboard Navigation
6. ✅ **PWA-Ready** - Service Worker, Manifest
7. ✅ **Cleanup-Methode** - Memory Leak Prevention (teilweise)
8. ✅ **Error Handling** - Try-Catch Blöcke an kritischen Stellen
9. ✅ **CSS Custom Properties** - Einfaches Theming
10. ✅ **Reduced Motion Support** - Barrierefreiheit

---

## 🎯 EMPFEHLUNGEN

### Kurzfristig (diese Woche):
1. 🔴 **Fix Storage-Key Bug** - Kritisch für Daten-Persistenz
2. 🔴 **Fix Memory Leak** - Event Delegation implementieren
3. 🔴 **Fix isDoorUnlocked()** - Jahr-Logik korrigieren

### Mittelfristig (nächster Sprint):
4. 🟡 **Position-Generierung verbessern** - Fallback-Grid
5. 🟡 **Input-Validierung** - parseInt-Ergebnisse prüfen
6. 🟡 **Performance** - innerHTML durch bessere Methoden ersetzen
7. 🟡 **Accessibility** - Live-Regions für Screen Reader

### Langfristig (nächste Version):
8. 🟢 **TypeScript Migration** - Type-Safety
9. 🟢 **Testing** - Unit Tests mit Jest
10. 🟢 **i18n** - Mehrsprachigkeit
11. 🟢 **Spatial Hashing** - Bessere Kollisionserkennung
12. 🟢 **PWA Optimierung** - Update-Flow, Offline-Page

---

## 📈 METRIKEN

### Code-Statistiken:
- **Zeilen Code:** ~2.000 (ohne quotes.js)
- **Komplexität:** Mittel (O(n²) an einer Stelle)
- **Test-Coverage:** 0% (keine Tests vorhanden)
- **Bundle Size:** ~18KB (gzipped, ohne Assets)

### Browser-Support:
- ✅ Chrome/Edge (Modern)
- ✅ Firefox
- ✅ Safari (iOS 12+)
- ⚠️ IE11 (nicht unterstützt - Service Worker fehlt)

---

## 🔍 TESTING-EMPFEHLUNGEN

### Unit Tests benötigt für:
```javascript
// Kritische Business-Logik
describe('CalendarApp', () => {
    test('isDoorUnlocked() - Tag in Vergangenheit', () => {});
    test('isDoorUnlocked() - Tag in Zukunft', () => {});
    test('generateDoorPositions() - Keine Überlappungen', () => {});
    test('getStorageKey() - Korrektes Jahr', () => {});
});
```

### Integration Tests:
- Service Worker Caching
- LocalStorage Persistenz
- Modal Focus Trap
- Keyboard Navigation

### E2E Tests:
- User öffnet Türchen
- Monatswechsel
- Shuffle-Funktionalität
- PWA Installation

---

## 📝 FAZIT

Die Codebase ist **solide und professionell**, zeigt aber einige **kritische Bugs** die behoben werden sollten:

**Stärken:**
- Moderne PWA mit Offline-Support
- Gute Accessibility-Grundlagen
- Saubere Architektur

**Schwächen:**
- Memory Leaks bei Event Listeners
- Storage-Key Bug führt zu Datenverlust
- Fehlende Tests
- Keine Type-Safety

**Gesamtbewertung:** ⭐⭐⭐⭐ (4/5)
Mit den vorgeschlagenen Fixes: ⭐⭐⭐⭐⭐ (5/5)

---

**Nächster Schritt:** Möchtest du, dass ich die kritischen Bugs direkt behebe?
