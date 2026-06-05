const { chromium } = require('/tmp/node_modules/playwright');
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:8099/';
const OUT = '/home/user/ProjectSH/shots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, acceptDownloads: true });
  const p = await ctx.newPage();
  p.setDefaultTimeout(25000);
  const shot = async (n) => { await p.screenshot({ path: `${OUT}/${n}.png` }); console.log('shot', n); };
  const next = async () => { await p.getByText('اللي من بعد').first().click(); await sleep(300); };
  const tap = async (txt) => { await p.getByText(txt, { exact: true }).first().click(); await sleep(420); };

  await p.goto(BASE, { waitUntil: 'load' });
  await p.getByText('مولات النية').first().waitFor(); await sleep(900);
  await p.getByText('يالاه نبداو').nth(1).click(); // couple
  await p.locator('input').first().waitFor(); await sleep(400);
  await p.locator('input').first().fill('سلمى'); await next();
  await p.locator('input').first().fill('كريم'); await next();
  await p.getByText('اختار التاريخ').first().click(); await sleep(400); await p.getByText('اللي من بعد').last().click(); await sleep(300); await next();
  await p.getByText('اختار التاريخ').first().click(); await sleep(400); await p.getByText('اللي من بعد').last().click(); await sleep(300); await next();
  await tap('الصباح');                     // birthTime
  await tap('شي سنين');                    // howLong
  await tap('ثقة كاملة');                  // trust
  await tap('بزاف ديال الدلال و القرب');   // affection
  await tap('بالكلام الزوين');             // loveLang
  await tap('كنهضر فالحين باش نحلوه');     // conflict
  await tap('الجوج كنتلاقاو فالنص');       // firstStep
  await tap('بجوج كنتشاورو');              // decide
  await tap('القلب الكبير');               // admire
  await tap('الروتين');                    // challenge
  await tap('نبنيو دارنا');                // sharedDream
  await tap('الزواج');                     // project
  await tap('العافية');                    // element
  await tap('الربيع');                     // season
  await tap('حدا البحر');                  // dreamPlace -> loading
  await sleep(900);
  await p.getByText('شارك').first().waitFor({ timeout: 15000 });
  await sleep(1600);
  await shot('couple-r-top');
  await p.mouse.move(196, 400);
  for (let i=0;i<4;i++){ await p.mouse.wheel(0, 1000); await sleep(650); await shot('couple-r-'+i); }
  // Test the web share -> image download
  await p.mouse.wheel(0, 2000); await sleep(500);
  const [ dl ] = await Promise.all([
    p.waitForEvent('download', { timeout: 10000 }).catch(()=>null),
    p.getByText('شارك').first().click(),
  ]);
  console.log('download:', dl ? await dl.suggestedFilename() : 'none');
  await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1);});
