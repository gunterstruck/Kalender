# Filme

## Werbefilme (kurz)

| Datei | Format | Einsatz |
|---|---|---|
| `werbung-whatsapp-status-9x16.mp4` | 1080×1920 (9:16), 28 s, ca. 4 MB | **WhatsApp-Status**, Instagram/Facebook-Story, Reels, Shorts |
| `werbung-desktop-16x9.mp4` | 1920×1080 (16:9), 28 s, ca. 3,5 MB | Präsentation, Website, LinkedIn, YouTube |
| `werbung-*-vorschau.jpg` | Standbild | Vorschaubild/Thumbnail |

**Aufbau:** Intro (App-Icon, Name, „Jeden Tag eine Lebensweisheit.“) →
echte App im Handy- bzw. Monitorrahmen mit wechselnden Werbetexten
(„Jeden Tag ein Türchen.“ · „Vier Jahreszeiten.“ · „Kein Türchen verpassen.“ ·
„Dein täglicher Moment Inspiration.“) → Abschlusskarte „Jetzt kostenlos
ausprobieren“ mit `kalender356.vercel.app` (Handy: „👇 Link unten im
Status“). Durchgehend: „Kostenlos · Ohne Werbung · Ohne Konto“.

**WhatsApp-Status:** Video unter 30 s, damit es auch auf älteren Versionen
nicht geteilt wird; H.264/AAC, 30 fps. Den Link (Play Store bzw.
https://kalender356.vercel.app/) als Text unter das Video schreiben.

**Neu erzeugen:** `sh film/promo/render-promo.sh` (Grafiken aus
`film/promo/stage.html`, Aufnahme der versteckten Kurz-Vorführung `promo`,
Schnitt mit ffmpeg). Texte und Adresse stehen in `film/promo/stage.html`.
Schrift: Nunito (SIL Open Font License, `film/promo/fonts/`).

# Demo-Videos (große Tour)

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
