#!/bin/sh
# Erzeugt custom-gpt-upload/ aus docs/. Die Kopien nicht direkt bearbeiten.
set -e
cd "$(dirname "$0")/.."
mkdir -p custom-gpt-upload
for f in guide-ki-wissensbasis.md kurzanleitung-kalender.md custom-gpt-systemprompt.txt; do
  cp "docs/$f" "custom-gpt-upload/$f"
done
VERSION=$(grep -o 'Version [0-9.]*' index.html | head -1 | cut -d' ' -f2)
cat > custom-gpt-upload/README.md <<EOT
# Monatskalender mit Türchen - Export für KI-Guide / Custom GPT

Generierter Uploadstand, App $VERSION.

Diese Kopien nicht direkt bearbeiten. Quellen liegen unter \`docs/\`. Nach jeder Änderung \`sh tools/build-gpt-upload.sh\` ausführen.

1. Inhalt von \`custom-gpt-systemprompt.txt\` in das Feld für die Anweisungen kopieren.
2. \`guide-ki-wissensbasis.md\` und \`kurzanleitung-kalender.md\` als Wissen hochladen.
3. Testfrage: "Warum kann ich das Türchen vom letzten Monat nicht mehr öffnen?"
EOT
echo "custom-gpt-upload/ aktualisiert (App $VERSION)"
