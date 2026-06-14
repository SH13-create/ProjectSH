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
 await p.locator('input').first().fill('ياسمين');
 await p.getByText('اللي من بعد').first().click(); await sleep(350);
 await p.getByText('اختار التاريخ').first().click(); await sleep(400);
 await p.getByText('اللي من بعد').last().click(); await sleep(300);
 await p.getByText('اللي من بعد').first().click(); await sleep(350);
 for(let step=0; step<32; step++){
   if(await p.getByText('شارك').count()>0) break;
   if(await p.getByText('اختار التاريخ').count()>0){
     await p.getByText('اختار التاريخ').first().click(); await sleep(350);
     await p.getByText('اللي من بعد').last().click(); await sleep(250);
     await p.getByText('اللي من بعد').first().click(); await sleep(300);
     continue;
   }
   // click first option by position (options start ~y=230 on these screens)
   await p.mouse.click(196, 250).catch(()=>{});
   await sleep(380);
 }
 const ok = await p.getByText('شارك').count()>0;
 console.log('reached result:', ok);
 if(ok){ await sleep(1500); await p.screenshot({path:'/home/user/ProjectSH/shots/result-check.png',fullPage:true}); console.log('shot saved'); }
 await b.close();
})().catch(e=>{console.error('ERR',e.message.slice(0,100));process.exit(1)});
