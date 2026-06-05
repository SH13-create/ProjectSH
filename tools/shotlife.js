const { chromium } = require('/tmp/node_modules/playwright');
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:8099/';
const OUT = '/home/user/ProjectSH/shots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
  const p = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2 }).then(c=>c.newPage());
  p.setDefaultTimeout(20000);
  const shot = async (n) => { await p.screenshot({ path: `${OUT}/${n}.png` }); console.log('shot', n); };
  await p.goto(BASE, { waitUntil: 'load' });
  await p.getByText('مولات النية').first().waitFor(); await sleep(900);
  await p.getByText('حلّل بالتصاور').first().click(); await sleep(700);
  // The two photo slots are the elements whose label text exactly matches.
  const choose = async (slot, file) => {
    const [c] = await Promise.all([
      p.waitForEvent('filechooser'),
      p.getByText(slot, { exact: true }).first().click(),
    ]);
    await c.setFiles(file); await sleep(900);
  };
  await choose('تصويرتك', '/tmp/face1.png');
  await choose('تصويرة شريكك', '/tmp/face2.png');
  const tb = p.locator('input:not([type=file])');
  await tb.nth(0).fill('سلمى'); await tb.nth(1).fill('كريم'); await sleep(300);
  await p.getByText('حلّل دابا').first().click(); await sleep(2600);
  await p.mouse.move(196, 400);
  const labels = ['life-a','life-b','life-c','life-d','life-e','life-f','life-g','life-h'];
  for (let i=0;i<labels.length;i++){ await shot(labels[i]); await p.mouse.wheel(0, 900); await sleep(700); }
  await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1);});
