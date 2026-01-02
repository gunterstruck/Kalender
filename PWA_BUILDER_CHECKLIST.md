# PWA Builder - Optimierungs-Checkliste & Anleitung

## ✅ Abgeschlossene Optimierungen

### 1. manifest.json
- ✅ **id hinzugefügt**: Eindeutige App-ID für PWABuilder gesetzt
- ✅ **start_url optimiert**: Explizite Angabe `./index.html` statt `./`
- ✅ **description erweitert**: Von 102 auf 240+ Zeichen (PWABuilder empfiehlt 200+)
- ✅ **lang präzisiert**: `de-DE` statt nur `de`
- ✅ **icons**: Alle erforderlichen Größen vorhanden (192x192, 512x512, maskable)
- ✅ **screenshots**: 2 Mobile Screenshots korrekt eingetragen (1080x2400, narrow)
- ✅ **categories**: Gesetzt auf `["lifestyle", "entertainment", "utilities"]`
- ✅ **theme_color & background_color**: Korrekt gesetzt

### 2. index.html
- ✅ **viewport optimiert**: `viewport-fit=cover` für iPhone X+ Notch-Support
- ✅ **description erweitert**: Ausführliche Meta-Beschreibung
- ✅ **theme-color für Dark Mode**: Media-Query für `prefers-color-scheme: dark`
- ✅ **iOS Meta-Tags**: Alle erforderlichen Apple-Tags vorhanden
- ✅ **Apple Touch Icons**: Korrekt verlinkt

### 3. Service Worker
- ✅ **Offline-Fähigkeit**: Robuste Caching-Strategie implementiert
- ✅ **Stale-While-Revalidate**: Für JS/CSS (schnelle Performance)
- ✅ **Cache-First**: Für Assets (Bilder, Icons)
- ✅ **Offline-Fallback**: Dedizierte Offline-Nachricht für HTML
- ✅ **Fehlerbehandlung**: Umfassende Error-Handling-Logik

### 4. .well-known/assetlinks.json
- ✅ **Vorlage erstellt**: JSON-Struktur vorbereitet
- ⚠️ **Manuelle Konfiguration erforderlich** (siehe unten)

---

## ⚠️ MANUELLE SCHRITTE ERFORDERLICH

### 1. Google Play Store - assetlinks.json konfigurieren

Die Datei `.well-known/assetlinks.json` muss mit Ihren tatsächlichen App-Daten gefüllt werden:

**Schritt 1: Package Name festlegen**
- Ersetzen Sie `com.example.tuerchenkalender` durch Ihren tatsächlichen Package-Namen
- Format: `com.ihrefirma.tuerchenkalender` (nur Kleinbuchstaben, Punkte)

**Schritt 2: SHA-256 Fingerprint erhalten**
1. Gehen Sie zu [PWABuilder.com](https://www.pwabuilder.com/)
2. Geben Sie Ihre URL ein und klicken Sie auf "Start"
3. Wählen Sie "Android" im Package-Dialog
4. Laden Sie das signierte APK herunter
5. PWABuilder zeigt Ihnen den SHA-256 Fingerprint an
6. Kopieren Sie den Fingerprint (Format: `XX:XX:XX:XX...`)
7. Ersetzen Sie `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` in der Datei

**Beispiel korrekt ausgefüllte assetlinks.json:**
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.ihrefirma.tuerchenkalender",
      "sha256_cert_fingerprints": [
        "14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"
      ]
    }
  }
]
```

**Wichtig:** Die assetlinks.json muss unter `https://ihre-domain.de/.well-known/assetlinks.json` erreichbar sein!

---

## 📱 OPTIONAL: Desktop/Tablet Screenshots

Für eine noch bessere Store-Präsenz können Sie zusätzliche Screenshots hinzufügen:

**Empfohlene Größen:**
- **Desktop/Tablet (wide)**: 1920x1080 oder 2560x1440
- **Format**: JPG oder PNG
- **Anzahl**: Mindestens 2, maximal 8

**Speicherort:** `assets/screenshots/`

**Beispiel-Namen:**
- `screen-desktop-1.jpg`
- `screen-desktop-2.jpg`
- `screen-tablet-1.jpg`
- `screen-tablet-2.jpg`

**Nach dem Hinzufügen in manifest.json eintragen:**
```json
{
  "src": "assets/screenshots/screen-desktop-1.jpg",
  "sizes": "1920x1080",
  "type": "image/jpeg",
  "form_factor": "wide"
}
```

---

## 🚀 PWABuilder Deployment-Schritte

### 1. Vorbereitung
- [ ] Alle Änderungen committen und pushen
- [ ] App auf einem HTTPS-Server deployen
- [ ] Sicherstellen, dass Service Worker registriert ist

### 2. PWABuilder verwenden
1. Gehen Sie zu [https://www.pwabuilder.com/](https://www.pwabuilder.com/)
2. Geben Sie Ihre URL ein (z.B. `https://ihre-domain.de`)
3. Klicken Sie auf "Start"
4. PWABuilder analysiert Ihre App und zeigt einen Score

### 3. Manifest-Score prüfen
- **Ziel:** Mindestens 90/100 Punkte
- Bei Problemen: Überprüfen Sie die manifest.json auf Tippfehler
- Alle erforderlichen Felder sollten jetzt vorhanden sein

### 4. Service Worker-Score prüfen
- **Ziel:** Mindestens 90/100 Punkte
- Testen Sie die Offline-Funktionalität
- Öffnen Sie die App, schalten Sie offline und laden Sie neu

### 5. App Packages erstellen

**Für Android (Google Play Store):**
1. Klicken Sie auf "Package for Stores"
2. Wählen Sie "Android" → "Google Play"
3. Füllen Sie die Felder aus:
   - Package ID: `com.ihrefirma.tuerchenkalender`
   - App Name: `Türchenkalender`
   - Launcher Name: `Türchenkalender`
   - Version: `1.5.60`
4. Laden Sie das signierte APK/AAB herunter
5. Notieren Sie den SHA-256 Fingerprint
6. Aktualisieren Sie die assetlinks.json (siehe oben)

**Für iOS (Apple App Store):**
1. Klicken Sie auf "Package for Stores"
2. Wählen Sie "iOS" → "App Store"
3. Folgen Sie den Anweisungen von PWABuilder
4. **Wichtig:** Apple erfordert ein Entwicklerkonto ($99/Jahr)
5. Laden Sie das Xcode-Projekt herunter
6. Öffnen Sie es in Xcode und signieren Sie es
7. Laden Sie es über Xcode in den App Store hoch

### 6. Store Listings vorbereiten

**Google Play Store:**
- [ ] Kurzbeschreibung (max. 80 Zeichen)
- [ ] Vollständige Beschreibung (max. 4000 Zeichen)
- [ ] Screenshots (mindestens 2, optimal 8)
- [ ] App-Icon (512x512)
- [ ] Feature Graphic (1024x500) - **FEHLT NOCH!**
- [ ] Kategorien auswählen
- [ ] Datenschutzerklärung-URL

**Apple App Store:**
- [ ] App-Name
- [ ] Untertitel (30 Zeichen)
- [ ] Beschreibung (4000 Zeichen)
- [ ] Keywords (100 Zeichen)
- [ ] Screenshots (verschiedene Geräte)
- [ ] App-Icon (1024x1024) - **FEHLT NOCH!**
- [ ] Support-URL
- [ ] Datenschutzerklärung-URL

---

## 📋 Fehlende Assets-Liste

### KRITISCH (erforderlich für Stores):
1. **Google Play Feature Graphic**: 1024x500 PNG/JPG
   - Wird auf der Store-Seite prominent angezeigt
   - Sollte App-Name und Key-Visual enthalten

2. **App Store Icon**: 1024x1024 PNG
   - Für Apple App Store erforderlich
   - Muss ohne Transparenz sein
   - Keine abgerundeten Ecken (macht iOS automatisch)

### OPTIONAL (verbessert Präsentation):
3. **Desktop/Tablet Screenshots**: 1920x1080 oder höher
   - Mindestens 2, optimal 4-8
   - Zeigt App auf größeren Bildschirmen

4. **Promotional Video**: 30 Sekunden
   - Für Google Play Store
   - Zeigt App-Features in Aktion

---

## 🔍 Qualitätsprüfung vor Veröffentlichung

### Lighthouse-Audit durchführen:
```bash
# Chrome DevTools > Lighthouse
# Oder via CLI:
lighthouse https://ihre-domain.de --view
```

**Zielwerte:**
- Performance: > 90
- PWA: 100
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### PWA-Checkliste:
- [ ] App lädt offline
- [ ] Service Worker ist registriert
- [ ] Manifest ist korrekt
- [ ] Icons sind vorhanden (192x192, 512x512)
- [ ] App ist installierbar
- [ ] HTTPS ist aktiviert
- [ ] Viewport ist responsive
- [ ] Touch-Events funktionieren
- [ ] Keine Konsolen-Fehler

---

## 📞 Support & Ressourcen

- **PWABuilder Docs**: https://docs.pwabuilder.com/
- **Google Play Console**: https://play.google.com/console
- **Apple Developer**: https://developer.apple.com/
- **Web.dev PWA Guide**: https://web.dev/progressive-web-apps/

---

## ✨ Zusammenfassung

**Was wurde optimiert:**
- ✅ manifest.json: Vollständig PWABuilder-kompatibel
- ✅ index.html: iOS und Android optimiert
- ✅ Service Worker: Robuste Offline-Funktionalität
- ✅ Icons & Screenshots: Vorhanden und korrekt konfiguriert

**Was Sie noch tun müssen:**
1. assetlinks.json mit tatsächlichen Daten füllen (nach PWABuilder-Packaging)
2. Feature Graphic erstellen (1024x500)
3. App Store Icon erstellen (1024x1024)
4. Optional: Desktop Screenshots hinzufügen

**Nächster Schritt:**
Gehen Sie zu PWABuilder.com und starten Sie den Packaging-Prozess!
