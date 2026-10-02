# Demo-Videos

Die große Tour der Livedemo als Video – für Präsentationen, Store-Einträge
oder Social Media, wenn die App nicht live gezeigt werden kann.

| Datei | Format | Inhalt |
|---|---|---|
| `livedemo-desktop.mp4` | 1920×1080 (Desktop-Ansicht 1280×800) | große Tour (ca. 2:15), mit Musik |
| `livedemo-smartphone.mp4` | 1080×1920 (Smartphone-Ansicht 390×844) | große Tour (ca. 2:15), mit Musik |

Die Videos sind echte Aufnahmen der laufenden App (Chrome-Screencast), keine
Animation. Sie sind **nicht** Teil der App und nicht im Offline-Cache.

**Musik:** „Tropical Island House 2024“ von Sascha Ende (ende.app), lizenziert
unter CC BY 4.0 – bei Weitergabe der Videos diese Namensnennung mitgeben.
Nachweis: `docs/licenses/tropical-island-house-2024/`.

**Hinweis:** Die Aufnahmen zeigen den Stand und das Datum des Aufnahmetags
(Version 1.9.0, 2. Oktober 2026).

## Neu aufnehmen

```sh
sh film/render-livedemo.sh
```

Das Skript startet einen lokalen Server, nimmt beide Ansichten nacheinander auf
(`film/record-livedemo.js`) und erzeugt die MP4-Dateien mit ffmpeg (H.264/AAC).
Dauer: ca. 5 Minuten.
