# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [1.9.4] - 2026-10-02

### 🎨 Gestaltung
- Livedemo-Knopf oben links als runder grüner Knopf mit **Filmklappen-Symbol** (mit kleinem Play-Dreieck) statt Text „▶ Livedemo/Demo“ – gleich groß wie der Farbschema-Knopf rechts; Beschriftung bleibt für Bildschirmleser und als Hinweis beim Überfahren
- Kopfzeile braucht dadurch weniger seitlichen Abstand
- Tour-Videos neu aufgenommen

## [1.9.3] - 2026-10-02

### 🎨 Gestaltung
- Akzentfarbe Smaragdgrün statt Rosa: Livedemo-Knopf, „Weiter ansehen“, Fortschrittsbalken, Tipp-Ring, Rahmen „Große Tour“ und Etikett „Heute“
- Icon in den Demo-Texten wackelt deutlich länger (1,5 s statt 0,45 s, mehrere Ausschläge, kurzes grünes Leuchten)

### 🌐 Adresse
- Neue Produktionsadresse **https://kalender356.vercel.app/** (vorher kalender-mu-coral.vercel.app) in Doku, KI-Guide und Werbefilmen

### 📣 Werbefilme
- `film/werbung-whatsapp-status-9x16.mp4` (1080×1920, 28 s, 4 MB) – App im Handyrahmen, Werbetexte darunter, Abschlusskarte mit Adresse und „Link unten im Status“; optimiert für den WhatsApp-Status (H.264/AAC, unter 30 s)
- `film/werbung-desktop-16x9.mp4` (1920×1080, 28 s) – Texte links, App im Monitor rechts
- Eigene, versteckte Kurz-Vorführung `liveDemo.start('promo', { clean: true })` ohne Steuerleiste und Untertitel; Skripte in `film/promo/`
- Tour-Videos neu aufgenommen (grüne Akzente, deutsche Browser-Oberfläche)

## [1.9.2] - 2026-10-02

### 🎬 Livedemo
- **Ruhiges Bild:** Während einer Demo passen Banner, Kalender und Monatsauswahl auf einen Bildschirm; die Seite scrollt nicht mehr (vorher bis ~200 px hin und her, auch in den Videos sichtbar)
- **Nachfrage beim Antippen:** Ein Tipp auf den Bildschirm (oder Esc) hält an und fragt „Weiter ansehen“ oder „Beenden“; Beenden führt zum aktuellen Monat zurück und blendet die Musik über 2,5 s aus
- Jede Vorführung beginnt im aktuellen Monat (vorher im zuletzt gewählten)
- **App-Icon in den Demo-Texten:** links in jedem Untertitel (wie der Fuchskopf bei TourFuchs), kurzes „Nicken“ bei neuem Text; auch in der Nachfrage
- Videos neu aufgenommen

### ✨ Verbesserungen
- **Monatsname immer vollständig lesbar** (auch „September 2026“, auch mit 120 % Systemschrift): Handys bis 480 px zeigen am Erinnerungs-Knopf nur die Glocke, das Auswahlfeld hat weniger Innenabstand und eine mit der Schrift wachsende Mindestbreite; nur wenn es trotzdem nicht reicht, rutscht der Knopf in die nächste Zeile (vorher bei 320 px abgeschnitten, bei 412 px ohne Reserve)

## [1.9.1] - 2026-10-02

### 🚀 Deployment über Vercel
- `vercel.json`: statische Auslieferung ohne Build; Sicherheits-Header (CSP inkl. `frame-ancestors`, `X-Frame-Options`, `nosniff`, HSTS, `Permissions-Policy`); Service Worker und Manifest ohne Zwischenspeicherung; `assets/` 1 Tag
- `.vercelignore`: Doku, Videos, Werkzeuge und Markdown werden nicht ausgeliefert
- Datenschutz (DE/EN): Hosting-Anbieter jetzt Vercel (Auftragsverarbeitung, kurzzeitige Logfiles, keine Vercel-Analyse-Dienste)
- README, Wissensbasis, TWA-Hinweise: Deployment und Umzug von GitHub Pages beschrieben

## [1.9.0] - 2026-10-02

### ✨ Neu
- **Tägliche Erinnerung** („🔔 Erinnerung“): Kalendereintrag (.ics) für alle Geräte; in der installierten App (Chrome/Edge) zusätzlich lokale Benachrichtigung per Periodic Background Sync – ohne Server, höchstens einmal täglich, nur wenn das Türchen noch zu ist
- **Zitat teilen**: Teilen-Menü des Geräts oder Zwischenablage
- **Livedemo-Auswahl** mit Mini-Demos: Türchen-Regeln (30 s), Zitat teilen (20 s), Erinnerung einrichten (30 s); Link „So funktioniert’s“ im Erinnerungsdialog
- **Englische Rechtstexte** (`privacy.html`, `imprint.html`), Fußzeile verlinkt passend zur Sprache
- **Demo-Videos** der großen Tour als MP4 (Desktop 1920×1080, Smartphone 1080×1920) mit Musik in `film/`

### 🐛 Behoben
- Kleine Handys: Türchen überlappten sich (Platzierung rechnete quadratisch, Türchen sind dort höher); jetzt echte Größe gemessen und verwackeltes Raster als Fallback
- Demo-Knopf lag über dem Zitat-Fenster; Meldungen lagen hinter dem Zitat-Fenster
- Kalenderdatei (.ics): Zeilen über 75 Bytes werden nach RFC 5545 umbrochen (strengere Kalenderprogramme)
- Rückfall für Browser ohne `<dialog>` (Safari < 15.4): Erinnerungsdialog wird eingeblendet, Livedemo startet direkt die große Tour

### 🎬 Livedemo
- Große Tour zeigt jetzt auch „Teilen“ und „Erinnerung“ (13 Schritte, ca. 2:15); Videos neu aufgenommen

## [1.8.1] - 2026-10-02

### ✨ Verbesserungen
- Das heutige, noch ungeöffnete Türchen leuchtet und trägt das Etikett „Heute“ (en: „Today“)
- Laptop/Desktop/Tablet quer: Kalenderhöhe passt sich dem Fenster an, die Monatsauswahl ist ohne Scrollen sichtbar
- README auf aktuellen Stand gebracht (Zitate, Freischaltlogik, Speicherschlüssel, Struktur)

## [1.8.0] - 2026-10-02

### 🎬 Livedemo
- Knopf „▶ Livedemo“ oben links (Smartphone: „▶ Demo“): geführte Vorführung der echten App in ca. 2 Minuten
- Zeiger, Untertitel (de/en), Fortschrittsbalken, Steuerleiste (Pause, Weiter, Tempo 1,2×–0,6×, Musik, Beenden/Esc)
- Inhalte: heutiges Türchen, gesperrtes und verpasstes Türchen, vier Jahreszeiten mit Easter Eggs, Hell/Dunkel
- Erklärt die jeweils sichtbare Ansicht (Smartphone/Tablet hochkant vs. Desktop/Tablet quer)
- Sandbox: Die Demo speichert nichts und stellt den vorherigen Zustand wieder her
- Musik „Tropical Island House 2024“ von Sascha Ende (CC BY 4.0), nicht im Offline-Cache

### 📚 Dokumentation & Recht
- Wissensbasis für KI-Guide, Kurzanleitung, Systemprompt (`docs/`, `custom-gpt-upload/`)
- Datenschutz und Impressum aktualisiert (Rechtsgrundlagen, Hosting, Livedemo, Musiknachweis)
- Rechtsseiten übernehmen das gewählte Farbschema und sind offline verfügbar

## [1.5.0] - 2025-12-23

### 🔧 Behobene Bugs

#### Kritische Fixes
- **Memory Leaks behoben**
  - Datum-Check Interval wird jetzt korrekt gecleaned (app.js:164-178)
  - Modal EventListener wird nur noch einmal registriert (app.js:97)
  - Neue `destroy()` Methode für korrekten Cleanup

- **LocalStorage Fehlerbehandlung**
  - Alle LocalStorage-Operationen haben jetzt try-catch Blöcke
  - Graceful Fallback bei Safari Private Mode
  - Storage-Verfügbarkeit wird beim Start geprüft (app.js:184-195)

- **Timezone-Probleme behoben**
  - `isDoorUnlocked()` verwendet jetzt `new Date()` statt gecachte Werte (app.js:215)
  - Korrekte Behandlung von Mitternacht-Übergängen

#### Sicherheit
- **Content Security Policy (CSP)** hinzugefügt
  - Schutz vor XSS-Angriffen
  - Einschränkung auf eigene Ressourcen

- **Input-Validierung**
  - Monatswahl wird validiert (0-11 Bereich) (app.js:464-468)
  - Fehlertoasts bei ungültigen Eingaben

- **Error Boundary**
  - Globaler Error Handler für JavaScript-Fehler
  - Unhandled Promise Rejection Handler
  - Benutzerfreundliche Fehlermeldungen

### ⚡ Performance-Optimierungen

- **DOM-Query Optimierung**
  - Türchen-Elemente werden in Map gecacht (app.js:36, 754)
  - Keine wiederholten DOM-Queries mehr

- **CSS-Verbesserungen**
  - `will-change` für animierte Elemente (styles.css:367)
  - `backdrop-filter` Fallback für ältere Browser (styles.css:449-457)
  - Deprecated `clip` durch `clip-path` ersetzt (styles.css:102)

- **Reduced Motion Support**
  - Animationen respektieren `prefers-reduced-motion` (styles.css:651-668)
  - Barrierefreiheit verbessert

### 🎨 Verbesserungen

- **Magic Numbers eliminiert**
  - Alle Konstanten in CONFIG-Objekt (app.js:10-20)
  - Bessere Wartbarkeit und Lesbarkeit

- **Ladeanimation**
  - Spinner beim initialen Laden
  - Sanftes Ausblenden wenn fertig

- **Noscript Fallback**
  - Hinweis wenn JavaScript deaktiviert ist
  - Benutzerfreundliche Anleitung

### 🧹 Code-Qualität

- **Service Worker aufgeräumt**
  - Toten Code entfernt (Push Notifications, Background Sync)
  - Kommentare bereinigt
  - Version auf 1.5.0 aktualisiert

- **Linting & Formatting**
  - ESLint Konfiguration hinzugefügt (.eslintrc.json)
  - Prettier Konfiguration hinzugefügt (.prettierrc.json)
  - .gitignore erweitert

### 📦 Versions-Synchronisation

- Alle Versionen auf 1.5.0 aktualisiert:
  - manifest.json
  - service-worker.js (CACHE_NAME + RUNTIME_CACHE)
  - README.md Badge (für zukünftige Updates)

---

## [1.4.0] - Vorherige Version

### Features
- 366 eindeutige Sprüche Datenbank
- Hintergrundbilder-Fix

---

## [1.3.0] - Vorherige Version

### Features
- Monatsauswahl nach unten verschoben
- Sprüche-Mischen Button hinzugefügt
