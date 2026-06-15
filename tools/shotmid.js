const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2}).then(c=>c.newPage());
 await p.goto('http://127.0.0.1:8099/',{waitUntil:'load'});
 await p.getByText('مولات النية').first().waitFor(); await sleep(1000);
 await p.mouse.move(196,400); await p.mouse.wheel(0,560); await sleep(500);
 await p.screenshot({path:'/home/user/ProjectSH/shots/daily-mid.png'}); console.log('mid');
 await b.close();
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
