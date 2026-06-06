const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE='http://127.0.0.1:8099/'; const OUT='/home/user/ProjectSH/shots';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox','--use-fake-ui-for-media-stream']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2}).then(c=>c.newPage());
 p.setDefaultTimeout(20000);
 await p.goto(BASE,{waitUntil:'load'}); await p.getByText('مولات النية').first().waitFor(); await sleep(1000);
 await p.getByText('هضر مع مولات النية').first().click(); await sleep(1200);
 await p.screenshot({path:`${OUT}/voice-1-open.png`}); console.log('shot open');
 // switch to typing to ask a love question deterministically
 await p.getByText('كتب بدل الصوت').first().click(); await sleep(500);
 await p.locator('input').first().fill('واش غادي نلقى الحب هاد العام؟');
 await p.screenshot({path:`${OUT}/voice-2-typed.png`}); console.log('shot typed');
 await p.locator('input').first().press('Enter'); await sleep(900);
 await p.screenshot({path:`${OUT}/voice-3-thinking.png`}); console.log('shot thinking');
 await sleep(1800);
 await p.screenshot({path:`${OUT}/voice-4-answer.png`}); console.log('shot answer');
 await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
