const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2}).then(c=>c.newPage());
 p.setDefaultTimeout(15000);
 await p.goto('http://127.0.0.1:8099/',{waitUntil:'load'});
 await p.getByText('مولات النية').first().waitFor(); await sleep(900);
 await p.getByText('يالاه نبداو').nth(0).click();
 await p.locator('input').first().waitFor(); await sleep(400);
 await p.locator('input').first().fill('سعد');
 await p.getByText('اللي من بعد').first().click(); await sleep(350);
 await p.getByText('اختار التاريخ').first().click(); await sleep(400);
 await p.getByText('اللي من بعد').last().click(); await sleep(300);
 await p.getByText('اللي من بعد').first().click(); await sleep(400);
 // walk forward by mouse-clicking first option until we hit the new color/dreamPlace question text
 for(let i=0;i<26;i++){
   if(await p.getByText('شمن لون كيعبّر عليك بزاف؟ 🎨').count()>0){ await p.screenshot({path:'/home/user/ProjectSH/shots/q-color.png'}); console.log('color shot'); break; }
   if(await p.getByText('اختار التاريخ').count()>0){ await p.getByText('اختار التاريخ').first().click(); await sleep(300); await p.getByText('اللي من بعد').last().click(); await sleep(250); await p.getByText('اللي من بعد').first().click(); await sleep(300); continue; }
   await p.mouse.click(196,250); await sleep(360);
 }
 await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message.slice(0,90));process.exit(1)});
