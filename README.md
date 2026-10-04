# 📅 Monatskalender mit Türchen

Eine moderne, installierbare **Progressive Web App (PWA)**, die einen interaktiven Monatskalender mit täglichen Türchen und inspirierenden Lebensweisheiten bietet.

![Version](https://img.shields.io/badge/version-1.9.6-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-ready-orange.svg)

> 📚 **Dokumentation:** vollständige Wissensbasis für Nutzer, Support und KI-Guide unter [`docs/`](docs/README.md). Bei Abweichungen gilt dort der App-Code-Stand.

## ✨ Features

- **📱 Installierbar als PWA**: Funktioniert wie eine native App auf Smartphone und Desktop
- **🔒 Intelligentes Türchen-Locking**: Türchen öffnen sich nur am entsprechenden Tag; das heutige Türchen leuchtet
- **💬 366 Lebensweisheiten je Sprache**: historische Zitate mit Lebensdaten und Wikipedia-Link, jedes genau einmal pro Jahr
- **🌍 Deutsch und Englisch**: automatisch nach Browsersprache
- **🎨 12 Monatsillustrationen**: je eine Fassung für Quer- und Hochformat, Jahreszeiten-Banner mit Easter Eggs
- **🎬 Livedemo**: große Tour (ca. 2 Min) und Mini-Demos (20–30 s) als geführte Vorführung der echten App, mit Musik; die Tour auch als MP4 in `film/`
- **📣 Werbefilme**: 28-s-Clips für WhatsApp-Status (9:16, Handyrahmen) und Desktop (16:9, Monitor) in `film/`
- **🔔 Tägliche Erinnerung**: Kalendereintrag (.ics) überall, Benachrichtigung in der installierten App (Chrome/Edge)
- **💬 Zitat teilen**: Teilen-Menü des Geräts oder Zwischenablage
- **📴 Offline-Fähig**: Funktioniert komplett ohne Internetverbindung
- **💾 Persistente Speicherung**: Fortschritt wird lokal gespeichert, kein Konto, keine Cookies; nur eine cookielose Zählung der Seitenaufrufe
- **🌓 Dark Mode Support**: Automatische Anpassung an Systemeinstellungen
- **♿ Barrierefrei**: Vollständige Tastatur- und Screen-Reader-Unterstützung
- **📅 Schaltjahr-Logik**: Korrekte Berechnung für Februar in Schaltjahren

## 🚀 Live Demo

Die App wird über **Vercel** ausgeliefert (Projekt im Team „Günter Struck's projects“).
**Live:** https://kalender356.vercel.app/

Vercel-Projekt: `kalender` (Team „gunter-strucks-projects“). Jeder Push auf `main` geht automatisch live, jeder Pull Request bekommt eine Vorschau-URL (nur mit Vercel-Login sichtbar).

## 📋 Voraussetzungen

- Ein moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- HTTPS-Verbindung (für PWA-Installation erforderlich)
- Für lokale Entwicklung: Ein statischer Webserver

## 🛠️ Installation & Setup

### Schritt 1: Repository klonen

```bash
git clone https://github.com/gunterstruck/Kalender.git
cd Kalender
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

### Schritt 3: Auf Vercel deployen

Die App ist eine rein statische Seite – **kein Build, keine Abhängigkeiten**. Die
Konfiguration liegt in `vercel.json` (Sicherheits- und Cache-Header) und
`.vercelignore` (Doku, Videos und Werkzeuge werden nicht ausgeliefert).

#### Variante A: Über das Vercel-Dashboard (empfohlen)

1. <https://vercel.com/new> öffnen und das GitHub-Repository `gunterstruck/Kalender` importieren
2. **Framework Preset:** „Other“ – Build Command, Output Directory und Install Command **leer lassen**
3. **Root Directory:** `./`
4. **Deploy** klicken
5. Ab dann deployt Vercel automatisch: jeder Push auf `main` → Produktion, jeder Pull Request → eigene Vorschau-URL

#### Variante B: Über die Vercel-CLI

```bash
npm i -g vercel
vercel          # Vorschau-Deployment (fragt beim ersten Mal nach Team/Projekt)
vercel --prod   # Produktion
```

#### Was `vercel.json` regelt

| Pfad | Header |
|---|---|
| alle | `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` |
| `/`, `/index.html` | `Content-Security-Policy` (wie das Meta-Tag, zusätzlich `frame-ancestors 'none'`) |
| `/service-worker.js` | nie zwischenspeichern (`max-age=0, must-revalidate`), damit Updates sofort ankommen |
| `/manifest.json` | korrekter Typ `application/manifest+json`, nicht zwischenspeichern |
| `/.well-known/assetlinks.json` | `application/json` (Android/TWA) |
| `/assets/*` | 1 Tag zwischenspeichern, danach im Hintergrund erneuern |

JS, CSS und HTML behalten den Vercel-Standard (`max-age=0, must-revalidate`),
weil die Dateinamen keine Versions-Hashes tragen.

#### Nach jedem Release

Cache-Version in `service-worker.js` erhöhen (siehe unten) – sonst sehen
installierte Apps geänderte Dateien erst verzögert.

#### Hinweis zum Umzug von GitHub Pages

Bisher lief die App unter `https://gunterstruck.github.io/Kalender/`. Nach dem
Umzug GitHub Pages abschalten (Repository → Settings → Pages → „None“) oder dort
auf die neue Adresse verweisen, damit nicht zwei Fassungen parallel laufen.
Fortschritt im Browser ist an die Adresse gebunden: Nutzer der alten Adresse
starten auf der neuen Adresse mit leerem Kalender. Eine bestehende Android-App
(TWA) muss für die neue Adresse neu gebaut werden (siehe `TWA_NOTES.md`).

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

Die Lebensweisheiten befinden sich in `/js/quotes.js` (Deutsch) und `/js/quotes-en.js` (Englisch):

```javascript
const QUOTES = [
    {
        text: "Der Anfang ist der wichtigste Teil der Arbeit.",
        author: "Platon",
        dates: "428-348 v. Chr.",
        link: "https://de.wikipedia.org/wiki/Platon",
        linkTitle: "Mehr über Platon (Wikipedia)"
    },
    // ...
];
```

**Tipps:**
- Genau 366 Zitate je Sprache halten (eins pro Tag, auch im Schaltjahr)
- Nur gemeinfreie Zitate verstorbener Persönlichkeiten verwenden
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
├── vercel.json            # Vercel: Header, kein Build
├── .vercelignore          # nicht ausgelieferte Ordner
├── impressum.html, datenschutz.html, imprint.html, privacy.html
├── css/
│   ├── styles.css         # Alle Styles (Mobile First)
│   └── livedemo.css       # Livedemo
├── js/
│   ├── app.js             # Haupt-App-Logik (CalendarApp)
│   ├── i18n.js, i18n-dom.js  # Sprache (de/en)
│   ├── quotes.js, quotes-en.js  # Zitate (je 366)
│   ├── pwa-install.js     # Service Worker, Install-Hinweis
│   ├── reminder.js        # Tägliche Erinnerung
│   └── livedemo.js        # Livedemo
├── assets/
│   ├── icons/             # App-Icons
│   ├── months/, months-portrait/  # Monats-Illustrationen
│   └── audio/             # Demo-Musik (CC BY 4.0)
├── docs/                  # Wissensbasis, Kurzanleitung, KI-Guide
└── film/                  # Demo-Videos (MP4) + Aufnahme-Skript
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
const CACHE_NAME = 'kalender-cache-v1.9.6';  // Version erhöhen!
const RUNTIME_CACHE = 'kalender-runtime-v1.9.6';  // Auch Runtime Cache!
```

**Dann:**

1. Änderungen committen und pushen
2. Seite im Browser hart neu laden (Strg+Shift+R / Cmd+Shift+R)
3. Service Worker wird automatisch aktualisiert

## 📊 Funktionsweise

### Türchen-Locking-Logik

1. **Aktueller Monat**: Türchen 1 bis zum heutigen Tag sind freigeschaltet (Nachholen möglich)
2. **Vergangene Monate**: Nur bereits geöffnete Türchen bleiben lesbar; alle anderen sind „verpasst“ (⏰), nächste Chance im Folgejahr
3. **Zukünftige Tage und Monate**: gesperrt
4. **Schaltjahr**: Februar hat automatisch 29 Tage in Schaltjahren

Ausführlich: [`docs/guide-ki-wissensbasis.md`](docs/guide-ki-wissensbasis.md).

### Datenpersistenz

Folgende Daten werden im LocalStorage gespeichert:

- `calendar_opened_v2_{JAHR}_{MONAT}`: Array der geöffneten Türchen (Monat 0-basiert)
- `calendar_quotes_{JAHR}_{de|en}`: Jahreszuordnung der Zitate zu den Tagen
- `calendar_positions_v4_{JAHR}_{MONAT}`: Türchen-Positionen in Prozent
- `calendar_selected_month_year_v2`: zuletzt gewählter Monat/Jahr
- `calendar_theme`: `light` oder `dark`
- `pwa_installed`: Merker nach Installation

Bei eingeschalteter Erinnerung zusätzlich `calendar_reminder` (Uhrzeit) und – für die App-Benachrichtigung – die IndexedDB `kalender-reminder`.

Die Livedemo schreibt nichts in den Local Storage.

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

### Vercel zeigt 404 oder eine leere Seite

- Im Projekt unter Settings → Build & Development: Framework „Other“, Build Command und Output Directory leer
- Root Directory muss `./` sein (dort liegt `index.html`)
- Deployment-Log im Vercel-Dashboard prüfen

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

- Öffne ein [GitHub Issue](https://github.com/gunterstruck/Kalender/issues)
- Lies die [Troubleshooting-Sektion](#-troubleshooting)
- Prüfe die Browser-Konsole auf Fehlermeldungen

## 🎯 Roadmap

Zukünftige Features (optional):

- [ ] Export-Funktion für geöffnete Türchen
- [x] Teilen-Funktion für Sprüche
- [x] Englisch (weitere Sprachen: FR, ES)
- [x] Tägliche Erinnerung
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
