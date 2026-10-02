#!/bin/sh
# Erzeugt die Werbefilme (WhatsApp-Status 9:16 und Desktop 16:9).
# Voraussetzungen: Node.js mit Playwright, ffmpeg (libx264, aac), python3.
# Aufruf im Repository-Stamm: sh film/promo/render-promo.sh
set -e
cd "$(dirname "$0")/../.."
WORK="${WORK:-$(mktemp -d)}"

python3 -m http.server 8765 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null' EXIT
sleep 1

node film/promo/render-graphics.js "$WORK/gfx"
node film/promo/record-promo.js "$WORK" phone 390 844 3 1
node film/promo/record-promo.js "$WORK" desktop 1280 800 1.5 0
node film/promo/compose-promo.js "$WORK/gfx" "$WORK/phone" phone film/werbung-whatsapp-status-9x16.mp4
node film/promo/compose-promo.js "$WORK/gfx" "$WORK/desktop" desktop film/werbung-desktop-16x9.mp4
