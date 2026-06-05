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

  await p.goto(BASE, { waitUntil: 'load' });
  await p.getByText('مولات النية').first().waitFor();
  await sleep(1000);
  // Go to photo mode
  await p.getByText('حلّل بالتصاور').first().click();
  await sleep(800);
  await shot('ph-01-picker');

  // expo-image-picker (web) crée un <input type=file> dynamiquement au clic :
  // on intercepte le filechooser.
  const choose = async (slotText, file) => {
    const [chooser] = await Promise.all([
      p.waitForEvent('filechooser'),
      p.getByText(slotText).first().click(),
    ]);
    await chooser.setFiles(file);
    await sleep(1000);
  };
  await choose('اختار تصويرة الأول', '/tmp/face1.png');
  await choose('اختار تصويرة الثاني', '/tmp/face2.png');
  // Fill names
  const tb = p.locator('input:not([type=file])');
  await tb.nth(0).fill('سلمى');
  await tb.nth(1).fill('كريم');
  await sleep(300);
  await shot('ph-02-ready');

  // Analyze
  await p.getByText('حلّل دابا').first().click();
  await sleep(2600); // laisser les jauges finir de s'animer
  await shot('ph-03-report-top');
  await shot('ph-04-report-full', true);

  // Scroll dans le ScrollView RN (molette au centre de l'écran).
  await p.mouse.move(196, 400);
  await p.mouse.wheel(0, 1400);
  await sleep(800);
  await shot('ph-05-family');
  await p.mouse.wheel(0, 1400);
  await sleep(800);
  await shot('ph-06-children');
  await p.mouse.wheel(0, 1400);
  await sleep(800);
  await shot('ph-07-destiny');

  await b.close();
  console.log('DONE');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
