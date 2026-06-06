const { chromium } = require('/tmp/node_modules/playwright');
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:8099/';
const OUT = '/home/user/ProjectSH/shots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
  const p = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2 }).then(c=>c.newPage());
  p.setDefaultTimeout(20000);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.getByText('مولات النية').first().waitFor(); await sleep(1200);
  await p.screenshot({ path: `${OUT}/avatar-home.png` }); console.log('shot avatar-home');
  // dark mode
  await p.getByText('🌙').first().click(); await sleep(700);
  await p.screenshot({ path: `${OUT}/avatar-home-dark.png` }); console.log('shot avatar-home-dark');
  await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1);});
