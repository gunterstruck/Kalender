// Nimmt die große Tour der Livedemo per Chrome-Screencast auf (Frames + Zeitstempel).
// Aufruf: node film/record-livedemo.js <ausgabe-ordner> <name> <breite> <höhe> <pixelfaktor> <mobil 0/1>
// Voraussetzung: App läuft lokal unter http://localhost:8765 (python3 -m http.server 8765)
const { chromium } = require('playwright');
const fs = require('fs');
const [,, outDir, name, w, h, dsf, mobile] = process.argv;
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dsf, isMobile: mobile === '1', hasTouch: mobile === '1', locale: 'de-DE', colorScheme: 'light' });
  const p = await ctx.newPage();
  await p.goto('http://localhost:8765/index.html');
  await p.waitForTimeout(6500); // Kopfzeile ausgeblendet, Banner da
  const dir = `${outDir}/${name}`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const cdp = await ctx.newCDPSession(p);
  const frames = [];
  cdp.on('Page.screencastFrame', async (f) => {
    const file = `${dir}/f${String(frames.length).padStart(5, '0')}.jpg`;
    fs.writeFileSync(file, Buffer.from(f.data, 'base64'));
    frames.push({ file, t: f.metadata.timestamp });
    try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch (e) {}
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: +w * +dsf, maxHeight: +h * +dsf, everyNthFrame: 1 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => window.liveDemo.start('tour'));
  while (await p.evaluate(() => window.liveDemo.running)) await p.waitForTimeout(500);
  await p.waitForTimeout(2500);
  await cdp.send('Page.stopScreencast');
  const end = frames[frames.length - 1].t + 0.04;
  let list = '';
  frames.forEach((f, i) => { const next = i + 1 < frames.length ? frames[i + 1].t : end; list += `file '${f.file}'\nduration ${Math.max(0.001, next - f.t).toFixed(4)}\n`; });
  list += `file '${frames[frames.length - 1].file}'\n`;
  fs.writeFileSync(`${dir}/list.txt`, list);
  console.log(name, 'frames', frames.length, 'dauer', (end - frames[0].t).toFixed(1), 's');
  await b.close();
})();
