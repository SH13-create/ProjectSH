const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE='http://127.0.0.1:8099/'; const OUT='/home/user/ProjectSH/shots';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2}).then(c=>c.newPage());
 await p.goto(BASE,{waitUntil:'load'}); await p.getByText('مولات النية').first().waitFor(); await sleep(800);
 await p.getByText('هضر مع مولات النية').first().click(); await sleep(900);
 await p.screenshot({path:`${OUT}/tts-tapstart.png`}); console.log('shot tapstart');
 await p.getByText('كبس باش تسمع مولات النية').first().click(); await sleep(1500);
 await p.screenshot({path:`${OUT}/tts-greeting.png`}); console.log('shot greeting');
 await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
