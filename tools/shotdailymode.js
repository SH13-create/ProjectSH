const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2}).then(c=>c.newPage());
 p.setDefaultTimeout(15000);
 await p.goto('http://127.0.0.1:8099/',{waitUntil:'load'});
 await p.getByText('مولات النية').first().waitFor(); await sleep(1000);
 await p.getByText('بدا مع مولات النية').first().click(); await sleep(900);
 await p.screenshot({path:'/home/user/ProjectSH/shots/dm-intro.png',fullPage:true}); console.log('intro');
 await p.getByText('كشف رسالة اليوم').first().click(); await sleep(1200);
 await p.screenshot({path:'/home/user/ProjectSH/shots/dm-reveal.png',fullPage:true}); console.log('reveal');
 await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
