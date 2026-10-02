// Rendert die Grafiken der Werbefilme aus film/promo/stage.html zu PNGs.
// Aufruf: node film/promo/render-graphics.js <ausgabe-ordner>
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const stage = 'file://' + path.resolve(__dirname, 'stage.html');
(async () => {
  const b = await chromium.launch();
  const geo = {};
  for (const layout of ['phone', 'desktop']) {
    const size = layout === 'phone' ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 };
    const p = await b.newPage({ viewport: size });
    const parts = [['bg'], ['frame'], ['intro'], ['outro'], ['mask'],
      ...['today', 'seasons', 'reminder', 'end'].map((s) => ['text', s])];
    for (const [part, scene] of parts) {
      await p.goto(`${stage}?layout=${layout}&part=${part}&scene=${scene || ''}`);
      await p.evaluate(() => window.ready);
      if (part === 'mask') {
        const g = await p.evaluate(() => window.GEO.screen);
        await p.setViewportSize({ width: g.w, height: g.h });
      }
      const name = `${layout}-${part}${scene ? '-' + scene : ''}.png`;
      await p.screenshot({ path: path.join(out, name), omitBackground: part === 'frame' || part === 'text' });
      geo[layout] = await p.evaluate(() => window.GEO);
      await p.setViewportSize(size);
    }
    await p.close();
  }
  fs.writeFileSync(path.join(out, 'geo.json'), JSON.stringify(geo, null, 2));
  console.log('Grafiken gerendert:', fs.readdirSync(out).length - 1);
  await b.close();
})();
