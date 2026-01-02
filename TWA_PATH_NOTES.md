# Pfad-Hinweis für TWA und GitHub Pages

## Angepasste Dateien
- `manifest.json`
- `js/pwa-install.js`
- `README.md`
- `TWA_NOTES.md`

## Warum `/Kalender/` zwingend notwendig ist
- **GitHub Pages Project Page:** Die App wird unter `https://gunterstruck.github.io/Kalender/` ausgeliefert.
- **Case-Sensitivity:** GitHub Pages behandelt Pfade strikt nach Groß-/Kleinschreibung. Eine kleingeschriebene Variante ist ein anderer Pfad und führt zu 404s.
- **Trusted Web Activity (TWA):** Start-URL, Scope und Service-Worker-Registrierung müssen exakt übereinstimmen, damit keine Redirects oder Scope-Konflikte entstehen.
