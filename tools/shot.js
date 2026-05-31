const { chromium } = require('/tmp/node_modules/playwright');
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:8099/';
const OUT = '/home/user/ProjectSH/shots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
  const p = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2 }).then(c=>c.newPage());
  p.setDefaultTimeout(20000);
  const shot = async (n, full=false) => { await p.screenshot({ path: `${OUT}/${n}.png`, fullPage: full }); console.log('shot', n); };
  const next = async () => { await p.getByText('اللي من بعد').first().click(); await sleep(350); };

  await p.goto(BASE, { waitUntil: 'load' });
  await p.getByText('مولات النية').first().waitFor();
  await sleep(1200);
  await shot('v3-01-home-avatar');

  // SOLO flow
  await p.getByText('يالاه نبداو').nth(0).click();
  await p.locator('input').first().waitFor(); await sleep(400);
  await p.locator('input').first().fill('ياسمين'); await next();
  await p.getByText('اختار التاريخ').first().click(); await sleep(400);
  await p.getByText('اللي من بعد').last().click(); await sleep(300); await next();
  await p.getByText('الصباح').first().click(); await sleep(500);
  await p.getByText('مرا').first().click(); await sleep(500);
  await p.getByText('عازب').first().click(); await sleep(500);
  await p.getByText('كنكون مرتاح و واثق').first().click(); await sleep(500);
  await shot('v3-02-solo-lovepast');
  await p.getByText('حبة وحدة كبيرة').first().click(); await sleep(500);
  await p.getByText('الإخلاص').first().click(); await sleep(500);
  await p.getByText('الغدر').first().click(); await sleep(500);
  await p.getByText('نلقى نص الروح').first().click(); await sleep(500);
  await p.getByText('العافية').first().click(); await sleep(500);
  await p.getByText('السبع').first().click(); await sleep(500);
  await p.getByText('الحمر').first().click(); await sleep(500);
  await p.getByText('حدا البحر').first().click(); await sleep(900);
  await p.getByText('شارك').first().waitFor({ timeout: 15000 });
  await sleep(1400);
  await shot('v3-03-solo-result', true);

  // COUPLE flow (distinct questions)
  await p.goto(BASE, { waitUntil: 'load' });
  await p.getByText('مولات النية').first().waitFor(); await sleep(700);
  await p.getByText('يالاه نبداو').nth(1).click();
  await p.locator('input').first().waitFor(); await sleep(400);
  await p.locator('input').first().fill('سلمى'); await next();
  await p.locator('input').first().fill('كريم'); await next();
  await p.getByText('اختار التاريخ').first().click(); await sleep(400);
  await p.getByText('اللي من بعد').last().click(); await sleep(300); await next();
  await p.getByText('اختار التاريخ').first().click(); await sleep(400);
  await p.getByText('اللي من بعد').last().click(); await sleep(300); await next();
  await p.getByText('الصباح').first().click(); await sleep(500);
  await shot('v3-04-couple-howlong');
  await b.close();
  console.log('DONE');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
