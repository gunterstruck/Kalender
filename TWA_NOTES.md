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

## Umzug auf Vercel (Version 1.9.1)
Die App wird jetzt über Vercel im Domain-Stamm (`/`) ausgeliefert. `manifest.json`
(`start_url` und `scope` = `./`) und die Service-Worker-Registrierung
(`./service-worker.js`, Scope `./`) sind relativ und funktionieren dort ohne
Änderung. Für eine Android-App (TWA) gilt:
- In Bubblewrap/PWABuilder Host und Start-URL auf die neue Vercel-Adresse bzw.
  eigene Domain setzen und die App neu bauen.
- `.well-known/assetlinks.json` wird unter der neuen Domain ausgeliefert
  (`vercel.json` setzt den Typ `application/json`). Der SHA-256-Fingerabdruck
  bleibt gleich, solange derselbe Signaturschlüssel verwendet wird.
- Die Pfad-Regeln aus `TWA_PATH_NOTES.md` (`/Kalender/`) betreffen nur die alte
  GitHub-Pages-Adresse.
