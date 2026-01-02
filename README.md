# 📅 Monatskalender mit Türchen

Eine moderne, installierbare **Progressive Web App (PWA)**, die einen interaktiven Monatskalender mit täglichen Türchen und inspirierenden Lebensweisheiten bietet.

![Version](https://img.shields.io/badge/version-1.6.6-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-ready-orange.svg)

## ✨ Features

- **📱 Installierbar als PWA**: Funktioniert wie eine native App auf Smartphone und Desktop
- **🔒 Intelligentes Türchen-Locking**: Türchen öffnen sich nur am entsprechenden Tag
- **💬 320+ Lebensweisheiten**: Hochwertige, motivierende deutsche Sprüche
- **🎨 12 Monatsillustrationen**: Einzigartige Märchen-/Fantasy-Designs für jeden Monat
- **🔄 Shuffle-Funktion**: Sprüche jederzeit neu mischen
- **📴 Offline-Fähig**: Funktioniert komplett ohne Internetverbindung
- **💾 Persistente Speicherung**: Fortschritt wird lokal gespeichert
- **🌓 Dark Mode Support**: Automatische Anpassung an Systemeinstellungen
- **♿ Barrierefrei**: Vollständige Tastatur- und Screen-Reader-Unterstützung
- **📅 Schaltjahr-Logik**: Korrekte Berechnung für Februar in Schaltjahren

## 🚀 Live Demo

Die App ist auf GitHub Pages verfügbar:
```
https://gunterstruck.github.io/Kalender/
```

## 📋 Voraussetzungen

- Ein moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- HTTPS-Verbindung (für PWA-Installation erforderlich)
- Für lokale Entwicklung: Ein statischer Webserver

## 🛠️ Installation & Setup

### Schritt 1: Repository klonen

```bash
git clone https://github.com/DEIN-USERNAME/DEIN-REPO-NAME.git
cd DEIN-REPO-NAME
```

### Schritt 2: Lokal testen

Mit Python (empfohlen):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Mit Node.js (http-server):
```bash
npx http-server -p 8000
```

Mit VS Code Live Server:
1. Installiere die "Live Server" Extension
2. Rechtsklick auf `index.html` → "Open with Live Server"

Öffne dann im Browser: `http://localhost:8000`

### Schritt 3: Auf GitHub Pages deployen

#### Variante A: Über GitHub UI

1. Gehe zu deinem GitHub Repository
2. Klicke auf **Settings** → **Pages**
3. Unter "Source" wähle **Branch: main** (oder den gewünschten Branch)
4. Wähle **/ (root)** als Verzeichnis
5. Klicke auf **Save**
6. Warte ca. 1-2 Minuten
7. Deine App ist verfügbar unter: `https://DEIN-USERNAME.github.io/REPO-NAME/`

#### Variante B: Über Git

```bash
# Committe alle Änderungen
git add .
git commit -m "Initial deployment"

# Pushe zum Main Branch
git push origin main

# Aktiviere GitHub Pages in den Repository-Settings (siehe Variante A)
```

#### Wichtig: `.nojekyll` Datei

Die `.nojekyll` Datei ist bereits im Repository enthalten. Sie verhindert, dass GitHub Pages Jekyll verwendet und stellt sicher, dass alle Dateien korrekt bereitgestellt werden.

## 📱 PWA Installation

### Auf Android (Chrome)

1. Öffne die App in Chrome
2. Tippe auf das Menü (⋮) → "App installieren" oder "Zum Startbildschirm hinzufügen"
3. Bestätige die Installation
4. Die App erscheint auf deinem Homescreen

### Auf iOS (Safari)

1. Öffne die App in Safari
2. Tippe auf das Teilen-Symbol (□ mit Pfeil nach oben)
3. Scrolle nach unten und wähle "Zum Home-Bildschirm"
4. Bestätige mit "Hinzufügen"

### Auf Desktop (Chrome/Edge)

1. Öffne die App im Browser
2. Klicke auf das ⊕-Symbol in der Adressleiste
3. Oder: Menü → "App installieren"
4. Bestätige die Installation

## 🎨 Anpassungen

### Monatsbilder austauschen

Die Monatsbilder befinden sich in `/assets/months/`:

```
assets/months/
  ├── january.svg
  ├── february.svg
  ├── march.svg
  └── ... (12 Monate)
```

**Eigene Bilder hinzufügen:**

1. Erstelle/platziere deine Bilder (SVG, PNG oder JPG) in `/assets/months/`
2. Benenne sie wie oben gezeigt (z.B. `january.svg`)
3. Empfohlene Auflösung: mindestens 800x600px
4. SVG wird empfohlen (skaliert perfekt, kleine Dateigröße)

### Sprüche erweitern/ändern

Die Lebensweisheiten befinden sich in `/js/quotes.js`:

```javascript
const QUOTES = [
    "Dein neuer Spruch hier...",
    "Noch ein inspirierender Spruch...",
    // ... füge beliebig viele hinzu
];
```

**Tipps:**
- Mindestens 31 Sprüche für einen vollen Monat
- Aktuell: 320+ Sprüche für Varianz
- Keine urheberrechtlich geschützten Zitate verwenden
- Kurz und prägnant halten (2-3 Sätze max.)

### Icons anpassen

Die App-Icons befinden sich in `/assets/icons/`:

```
assets/icons/
  ├── icon.svg          # Haupt-Icon (beliebige Größe)
  ├── icon-192.png      # 192x192px (erforderlich)
  └── icon-512.png      # 512x512px (erforderlich)
```

**Neue Icons erstellen:**

1. Erstelle ein quadratisches Icon (512x512px empfohlen)
2. Exportiere es als PNG in 192x192 und 512x512
3. Ersetze die bestehenden Dateien
4. Aktualisiere die `theme_color` in `/manifest.json` wenn nötig

### Farben anpassen

Passe die Farben in `/css/styles.css` an (CSS Custom Properties):

```css
:root {
    --primary: #6366f1;        /* Hauptfarbe */
    --primary-dark: #4f46e5;   /* Dunkle Variante */
    --secondary: #ec4899;      /* Akzentfarbe */
    /* ... weitere Farben */
}
```

## 🔧 Technische Details

### Architektur

```
/
├── index.html              # Haupt-HTML-Datei
├── manifest.json           # PWA-Manifest
├── service-worker.js       # Service Worker für Offline-Caching
├── .nojekyll              # GitHub Pages Konfiguration
├── css/
│   └── styles.css         # Alle Styles (Mobile First)
├── js/
│   ├── app.js             # Haupt-App-Logik
│   └── quotes.js          # Sprüche-Pool
└── assets/
    ├── icons/             # App-Icons
    └── months/            # Monats-Illustrationen
```

### Verwendete Technologien

- **Vanilla JavaScript** (ES6+) - Keine Frameworks
- **CSS3** mit Custom Properties
- **Service Worker API** - Offline-Funktionalität
- **LocalStorage API** - Persistente Datenhaltung
- **Web App Manifest** - PWA-Installation

### Browser-Kompatibilität

| Browser | Version | Unterstützt |
|---------|---------|-------------|
| Chrome  | 67+     | ✅ Vollständig |
| Firefox | 63+     | ✅ Vollständig |
| Safari  | 11.1+   | ✅ Vollständig |
| Edge    | 79+     | ✅ Vollständig |

### Offline-Cache aktualisieren

Wenn du Dateien änderst, musst du die Cache-Version erhöhen:

**In `/service-worker.js`:**

```javascript
const CACHE_NAME = 'kalender-cache-v1.5.0';  // Version erhöhen!
const RUNTIME_CACHE = 'kalender-runtime-v1.5.0';  // Auch Runtime Cache!
```

**Dann:**

1. Änderungen committen und pushen
2. Seite im Browser hart neu laden (Strg+Shift+R / Cmd+Shift+R)
3. Service Worker wird automatisch aktualisiert

## 📊 Funktionsweise

### Türchen-Locking-Logik

1. **Aktueller Monat**: Türchen 1 bis zum heutigen Tag sind freigeschaltet
2. **Vergangene Monate**: Alle Türchen sind freigeschaltet
3. **Zukünftige Monate**: Alle Türchen sind gesperrt
4. **Schaltjahr**: Februar hat automatisch 29 Tage in Schaltjahren

### Datenpersistenz

Folgende Daten werden im LocalStorage gespeichert:

- `calendar_opened_{JAHR}_{MONAT}`: Array der geöffneten Türchen
- `calendar_quotes_{JAHR}_{MONAT}`: Zuordnung von Sprüchen zu Tagen
- `calendar_selected_month`: Aktuell ausgewählter Monat

**Daten löschen:**

```javascript
// In der Browser-Konsole:
localStorage.clear();
location.reload();
```

## 🐛 Troubleshooting

### PWA wird nicht installierbar angezeigt

- Prüfe, ob die Seite über HTTPS läuft (erforderlich!)
- Stelle sicher, dass `manifest.json` korrekt verlinkt ist
- Öffne DevTools → Application → Manifest und prüfe auf Fehler
- Service Worker muss erfolgreich registriert sein

### Service Worker registriert sich nicht

- Öffne DevTools → Console und prüfe auf Fehler
- Stelle sicher, dass `service-worker.js` im Root-Verzeichnis liegt
- Prüfe den Pfad in der Service Worker Registrierung
- Cache-Version in `service-worker.js` erhöhen

### Türchen öffnen sich nicht

- Prüfe, ob JavaScript aktiviert ist
- Öffne die Browser-Konsole und suche nach Fehlern
- Stelle sicher, dass `quotes.js` vor `app.js` geladen wird

### Icons werden nicht angezeigt

- Prüfe die Pfade in `manifest.json`
- Stelle sicher, dass Icons existieren und korrekte Größen haben
- Cache leeren und Seite neu laden

### GitHub Pages zeigt 404

- Warte 1-2 Minuten nach dem ersten Push
- Prüfe GitHub Pages Settings im Repository
- Stelle sicher, dass Branch und Verzeichnis korrekt eingestellt sind
- Prüfe, ob `.nojekyll` Datei vorhanden ist

## 🤝 Beitragen

Contributions sind willkommen! So kannst du beitragen:

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📝 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe `LICENSE` Datei für Details.

## 🙏 Danksagungen

- Alle Illustrationen sind selbst erstellt (SVG)
- Keine externen Bibliotheken oder Frameworks
- Keine Tracker oder Analytics
- 100% Open Source

## 📞 Support & Kontakt

Bei Fragen oder Problemen:

- Öffne ein [GitHub Issue](https://github.com/DEIN-USERNAME/DEIN-REPO-NAME/issues)
- Lies die [Troubleshooting-Sektion](#-troubleshooting)
- Prüfe die Browser-Konsole auf Fehlermeldungen

## 🎯 Roadmap

Zukünftige Features (optional):

- [ ] Export-Funktion für geöffnete Türchen
- [ ] Teilen-Funktion für Sprüche
- [ ] Mehrsprachigkeit (EN, FR, ES)
- [ ] Benutzerdefinierte Spruch-Sammlungen
- [ ] Animationen beim Türchen-Öffnen
- [ ] Sound-Effekte (optional aktivierbar)
- [ ] Statistiken (z.B. "15 von 31 Türchen geöffnet")

## 🔒 Datenschutz

Diese App:
- Sammelt **keine** persönlichen Daten
- Verwendet **keine** Cookies
- Sendet **keine** Daten an Server
- Verwendet **keine** Analytics oder Tracking
- Speichert Daten **nur lokal** im Browser (LocalStorage)
- Ist **100% DSGVO-konform**

---

**Made with ❤️ and Vanilla JavaScript**

⭐ Gefällt dir das Projekt? Gib ihm einen Stern auf GitHub!
