const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE='http://127.0.0.1:8099/'; const OUT='/home/user/ProjectSH/shots';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2}).then(c=>c.newPage());
 p.setDefaultTimeout(20000);
 await p.goto(BASE,{waitUntil:'load'}); await p.getByText('مولات النية').first().waitFor(); await sleep(900);
 await p.getByText('هضر مع مولات النية').first().click(); await sleep(700);
 // ask a question via typing to trigger a spoken answer (fallback anim if no AR voice)
 await p.getByText('كتب بدل الصوت').first().click(); await sleep(400);
 await p.locator('input').first().fill('واش غادي نلقى الحب؟');
 await p.locator('input').first().press('Enter');
 // capture several frames during the speaking animation
 await sleep(1700); // past the "thinking" delay
 for (let i=0;i<6;i++){ await p.screenshot({path:`${OUT}/live-${i}.png`,clip:{x:0,y:60,width:393,height:300}}); console.log('frame',i); await sleep(180); }
 await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
