#!/bin/sh
# Erzeugt die Demo-Videos der großen Tour (Desktop und Smartphone) mit Musik.
# Voraussetzungen: Node.js mit Playwright, ffmpeg (libx264, aac), python3.
# Aufruf im Repository-Stamm: sh film/render-livedemo.sh
set -e
cd "$(dirname "$0")/.."
WORK="${WORK:-$(mktemp -d)}"
MUSIC=assets/audio/tropical-island-house-2024.mp3

python3 -m http.server 8765 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null' EXIT
sleep 1

# Nacheinander aufnehmen (parallel verlangsamt die Wiedergabe)
node film/record-livedemo.js "$WORK" desktop 1280 800 1.5 0
node film/record-livedemo.js "$WORK" phone 390 844 3 1

render() {
    name=$1; out=$2; filter=$3
    dur=$(awk '/^duration/ {s+=$2} END {printf "%.2f", s}' "$WORK/$name/list.txt")
    fade=$(awk -v d="$dur" 'BEGIN {printf "%.2f", d-3}')
    ffmpeg -y -loglevel error \
        -f concat -safe 0 -i "$WORK/$name/list.txt" \
        -stream_loop -1 -i "$MUSIC" \
        -filter_complex "[0:v]$filter,fps=30,format=yuv420p[v];[1:a]volume=0.55,afade=t=in:d=1.5,afade=t=out:st=$fade:d=3[a]" \
        -map "[v]" -map "[a]" -t "$dur" \
        -c:v libx264 -preset slow -crf 24 -c:a aac -b:a 128k -movflags +faststart "$out"
    echo "$out ($dur s)"
}

render desktop film/livedemo-desktop.mp4 "scale=-2:1000:flags=lanczos,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x0a1929"
render phone film/livedemo-smartphone.mp4 "scale=-2:1840:flags=lanczos,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x0a1929"
