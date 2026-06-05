const { chromium } = require('/tmp/node_modules/playwright');
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:8099/';
const OUT = '/home/user/ProjectSH/shots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
  const p = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2 }).then(c=>c.newPage());
  p.setDefaultTimeout(25000);
  const shot = async (n) => { await p.screenshot({ path: `${OUT}/${n}.png` }); console.log('shot', n); };
  const next = async () => { await p.getByText('اللي من بعد').first().click(); await sleep(300); };
  const tap = async (txt) => { await p.getByText(txt, { exact: true }).first().click(); await sleep(450); };

  await p.goto(BASE, { waitUntil: 'load' });
  await p.getByText('مولات النية').first().waitFor(); await sleep(900);
  await p.getByText('يالاه نبداو').nth(0).click();
  await p.locator('input').first().waitFor(); await sleep(400);
  await p.locator('input').first().fill('ياسمين'); await next();
  await p.getByText('اختار التاريخ').first().click(); await sleep(400);
  await p.getByText('اللي من بعد').last().click(); await sleep(300); await next();
  await tap('الصباح');                 // birthTime
  await tap('مرا');                    // gender
  await tap('عازب / عازبة');           // status
  await tap('كنعيش مع الناس و الحركة'); // socialEnergy extrovert
  await sleep(200); await shot('solo-q-personality');
  await tap('للقلب');                  // decision
  await tap('الطيبوبة');               // strength
  await tap('كثرة التفكير');           // flaw
  await tap('فالصباح بكري');           // rhythm
  await tap('مع شي صحاب قراب');        // socialPref
  await tap('الفن');                   // hobby
  await sleep(200); await shot('solo-q-values');
  await tap('العائلة');                // coreValue
  await tap('نأثّر فالعالم');          // lifeGoal
  await tap('كنهضر مع شي حد');         // stress
  await tap('كنكون مرتاح و واثق');     // loveStyle
  await tap('حبة وحدة كبيرة');         // lovePast
  await tap('الإخلاص');                // wantPartner
  await tap('الغدر');                  // fear
  await tap('أه بزاف');                // wantKids
  await tap('ندور العالم');            // dream
  await tap('بتفاؤل كبير');            // futureVision
  await tap('نلقى نص الروح');          // yearWish
  await tap('العافية');                // element
  await tap('السبع');                  // animal
  await tap('الحمر');                  // color
  await tap('حدا البحر');              // dreamPlace -> loading
  await sleep(900);
  await p.getByText('شارك').first().waitFor({ timeout: 15000 });
  await sleep(1400);
  await shot('solo-r-top');
  await p.mouse.move(196, 400);
  for (let i=0;i<5;i++){ await p.mouse.wheel(0, 1000); await sleep(650); await shot('solo-r-'+i); }
  await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1);});
