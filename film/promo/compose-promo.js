// Setzt einen Werbefilm zusammen: Intro → App im Geräterahmen mit Szenentexten → Abschlusskarte, mit Musik.
// Aufruf: node film/promo/compose-promo.js <gfx-ordner> <aufnahme-ordner> <phone|desktop> <ausgabe.mp4>
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const [,, gfx, rec, layout, out] = process.argv;
const geo = JSON.parse(fs.readFileSync(path.join(gfx, 'geo.json')))[layout];
const marks = JSON.parse(fs.readFileSync(path.join(rec, 'marks.json')));
const music = path.resolve(__dirname, '../../assets/audio/tropical-island-house-2024.mp3');
const PHONE = layout === 'phone';
const [W, H] = PHONE ? [1080, 1920] : [1920, 1080];
const s = geo.screen;

const INTRO = 2.2, OUTRO = 4.5, XF = 0.5, TF = 0.35;
const start = Math.max(0, marks.today - 0.2);
const main = +(marks.done - start).toFixed(2);
const scene = (n) => +(marks[n] - start).toFixed(2);
const texts = [
  ['today', 0, scene('seasons')],
  ['seasons', scene('seasons'), scene('reminder')],
  ['reminder', scene('reminder'), scene('end')],
  ['end', scene('end'), main],
];
const total = INTRO + main + OUTRO - 2 * XF;

const inputs = [
  '-loop', '1', '-t', String(INTRO), '-i', path.join(gfx, `${layout}-intro.png`),        // 0
  '-loop', '1', '-t', String(main), '-i', path.join(gfx, `${layout}-bg.png`),             // 1
  '-f', 'concat', '-safe', '0', '-i', path.join(rec, 'list.txt'),                          // 2
  '-loop', '1', '-t', String(main), '-i', path.join(gfx, `${layout}-mask.png`),           // 3
  '-loop', '1', '-t', String(main), '-i', path.join(gfx, `${layout}-frame.png`),          // 4
  ...texts.flatMap(([n]) => ['-loop', '1', '-t', String(main), '-i', path.join(gfx, `${layout}-text-${n}.png`)]), // 5–8
  '-loop', '1', '-t', String(OUTRO), '-i', path.join(gfx, `${layout}-outro.png`),         // 9
  '-i', music,                                                                              // 10
];

const f = [];
f.push(`[0]fps=30,format=yuv420p,setsar=1[intro]`);
f.push(`[2]trim=start=${start}:duration=${main},setpts=PTS-STARTPTS,fps=30,scale=${s.w}:${s.h}:flags=lanczos,format=rgba[app0]`);
f.push(`[3]fps=30,format=gray,scale=${s.w}:${s.h}[mask]`);
f.push(`[app0][mask]alphamerge[app]`);
f.push(`[1]fps=30,format=rgba[bg]`);
f.push(`[bg][app]overlay=${s.x}:${s.y}:shortest=1[m1]`);
f.push(`[m1][4]overlay=0:0:shortest=1[m2]`);
let last = 'm2';
texts.forEach(([n, a, b], i) => {
  const fadeIn = i === 0 ? '' : `,fade=t=in:st=${a}:d=${TF}:alpha=1`;
  const fadeOut = i === texts.length - 1 ? '' : `,fade=t=out:st=${Math.max(0, b - TF)}:d=${TF}:alpha=1`;
  f.push(`[${5 + i}]fps=30,format=rgba${fadeIn}${fadeOut}[t${i}]`);
  f.push(`[${last}][t${i}]overlay=0:0:enable='between(t,${Math.max(0, a - 0.01)},${b})'[m${3 + i}]`);
  last = `m${3 + i}`;
});
f.push(`[${last}]format=yuv420p,setsar=1[main]`);
f.push(`[9]fps=30,format=yuv420p,setsar=1[outro]`);
f.push(`[intro][main]xfade=transition=fade:duration=${XF}:offset=${INTRO - XF}[x1]`);
f.push(`[x1][outro]xfade=transition=fade:duration=${XF}:offset=${INTRO + main - 2 * XF}[v]`);
f.push(`[10]atrim=0:${total},asetpts=PTS-STARTPTS,volume=0.6,afade=t=in:d=0.8,afade=t=out:st=${(total - 2.5).toFixed(2)}:d=2.5[a]`);

execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...inputs,
  '-filter_complex', f.join(';'), '-map', '[v]', '-map', '[a]', '-t', total.toFixed(2),
  '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.1', '-preset', 'slow', '-crf', PHONE ? '22' : '21',
  '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '128k', '-ar', '44100',
  '-movflags', '+faststart', out], { stdio: 'inherit' });
console.log(out, `${total.toFixed(1)} s`, `${(fs.statSync(out).size / 1e6).toFixed(1)} MB`, JSON.stringify({ start, main, texts }));
