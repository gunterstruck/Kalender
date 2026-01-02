# TWA Konsistenz-Notiz

## Geänderte Dateien
- `manifest.json`
- `js/pwa-install.js`
- `README.md`

## Warum diese Änderungen notwendig waren
GitHub Pages behandelt Pfade case-sensitiv, während eine Trusted Web Activity (TWA)
und Chrome konsistente Start- und Scope-URLs ohne Redirects erwarten. Da die Seite
unter dem Pfad `/Kalender/` ausgeliefert wird, wurden Manifest und Service-Worker-
Registrierung auf die exakt gleiche Pfad-Schreibweise vereinheitlicht. Dadurch
entstehen keine Abweichungen zwischen URL, Scope und internen Ressourcen.
