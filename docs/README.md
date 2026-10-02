# Dokumentation - Monatskalender mit Türchen

| Datei | Zweck | Zielgruppe |
|---|---|---|
| [`guide-ki-wissensbasis.md`](guide-ki-wissensbasis.md) | Vollständige, verbindliche Wissensbasis (Funktionen, Regeln, Speicher, Datenschutz, Fehlersuche, Technik) | KI-Guide, Support, Entwickler |
| [`kurzanleitung-kalender.md`](kurzanleitung-kalender.md) | Einseitige Bedienanleitung | Nutzer |
| [`custom-gpt-systemprompt.txt`](custom-gpt-systemprompt.txt) | Anweisungen für einen Guide (Custom GPT / Claude-Projekt) | Betreiber |

Quelle der Wahrheit ist der App-Code (`js/app.js`, `js/i18n.js`, `service-worker.js`).

## KI-Guide einrichten

1. `custom-gpt-upload/` mit `tools/build-gpt-upload.sh` neu erzeugen.
2. Inhalt von `custom-gpt-upload/custom-gpt-systemprompt.txt` in das Anweisungsfeld kopieren.
3. `guide-ki-wissensbasis.md` und `kurzanleitung-kalender.md` als Wissen hochladen.
4. Testfrage: „Warum kann ich das Türchen vom letzten Monat nicht mehr öffnen?"

## Pflege

Bei jeder Änderung an Freischaltlogik, Speicherschlüsseln, Datenflüssen,
Version oder Service-Worker-Cache die Wissensbasis (Kopf: Version/Stand,
Abschnitte 4, 9, 10, 11, 16) und `datenschutz.html` mitziehen, danach den
Upload-Export neu erzeugen.
