const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE='http://127.0.0.1:8099/'; const OUT='/home/user/ProjectSH/shots';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:3}).then(c=>c.newPage());
 p.setDefaultTimeout(20000);
 await p.goto(BASE,{waitUntil:'load'}); await p.getByText('مولات النية').first().waitFor(); await sleep(900);
 await p.getByText('هضر مع مولات النية').first().click(); await sleep(700);
 await p.getByText('كتب بدل الصوت').first().click(); await sleep(400);
 await p.locator('input').first().fill('واش غادي نلقى الحب؟');
 await p.locator('input').first().press('Enter');
 await sleep(1700);
 // tight crop on the animated head (top center)
 const clip={x:120,y:40,width:150,height:150};
 for (let i=0;i<8;i++){ await p.screenshot({path:`${OUT}/face-${i}.png`,clip}); await sleep(140); }
 console.log('DONE');
 await b.close();
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
