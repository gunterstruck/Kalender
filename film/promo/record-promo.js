// Nimmt die Werbe-Vorführung (liveDemo.start('promo', { clean: true })) per
// Chrome-Screencast auf und speichert Frames, Zeitstempel und Szenenmarken.
// Aufruf: node film/promo/record-promo.js <ordner> <name> <breite> <höhe> <pixelfaktor> <mobil 0/1>
// Voraussetzung: App läuft lokal unter http://localhost:8765
const { chromium } = require('playwright');
const fs = require('fs');
const [,, outDir, name, w, h, dsf, mobile] = process.argv;
(async () => {
  // Deutsche Browser-Oberfläche: Uhrzeitfeld zeigt „08:00“ statt „08:00 AM“
  const b = await chromium.launch({ args: ['--lang=de-DE'], env: { ...process.env, LANG: 'de_DE.UTF-8', LANGUAGE: 'de' } });
  const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dsf, isMobile: mobile === '1', hasTouch: mobile === '1', locale: 'de-DE', colorScheme: 'light' });
  const p = await ctx.newPage();
  await p.goto('http://localhost:8765/');
  await p.waitForTimeout(6500);
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
  await p.waitForTimeout(800);
  await p.evaluate(() => window.liveDemo.start('promo', { clean: true }));
  await p.waitForFunction(() => (window.ldMarks || []).some((m) => m.name === 'done'), null, { timeout: 120000 });
  await p.waitForTimeout(300);
  const marks = await p.evaluate(() => window.ldMarks);
  await cdp.send('Page.stopScreencast');
  const end = frames[frames.length - 1].t + 0.04;
  let list = '';
  frames.forEach((f, i) => { const next = i + 1 < frames.length ? frames[i + 1].t : end; list += `file '${f.file}'\nduration ${Math.max(0.001, next - f.t).toFixed(4)}\n`; });
  list += `file '${frames[frames.length - 1].file}'\n`;
  fs.writeFileSync(`${dir}/list.txt`, list);
  const t0 = frames[0].t;
  const rel = Object.fromEntries(marks.map((m) => [m.name, +(m.t - t0).toFixed(3)]));
  fs.writeFileSync(`${dir}/marks.json`, JSON.stringify(rel, null, 2));
  console.log(name, 'frames', frames.length, 'marks', JSON.stringify(rel));
  await b.close();
})();
