# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

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
