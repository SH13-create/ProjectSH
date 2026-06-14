const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2}).then(c=>c.newPage());
 p.setDefaultTimeout(20000);
 await p.goto('http://127.0.0.1:8099/',{waitUntil:'load'});
 await p.getByText('مولات النية').first().waitFor(); await sleep(900);
 await p.getByText('يالاه نبداو').nth(0).click(); // solo
 await p.locator('input').first().waitFor(); await sleep(400);
 await p.locator('input').first().fill('ياسمين');
 const next=async()=>{await p.getByText('اللي من بعد').first().click();await sleep(300)};
 const tap=async(t)=>{await p.getByText(t,{exact:true}).first().click();await sleep(350)};
 await next();
 await p.getByText('اختار التاريخ').first().click(); await sleep(400);
 await p.getByText('اللي من بعد').last().click(); await sleep(300); await next();
 // answer remaining quickly by tapping first option each time until result
 for(let i=0;i<24;i++){
   const sh=await p.getByText('شارك').count().catch(()=>0);
   if(sh>0) break;
   // try date 'اختار التاريخ' if present
   const dt=await p.getByText('اختار التاريخ').count().catch(()=>0);
   if(dt>0){await p.getByText('اختار التاريخ').first().click();await sleep(300);await p.getByText('اللي من بعد').last().click();await sleep(250);await next();continue;}
   // else tap first card/option via clicking a likely option; fallback: press any chip
   const opts=['الصباح','مرا','عازب / عازبة','كنعيش مع الناس و الحركة','للقلب','الطيبوبة','كثرة التفكير','فالصباح بكري','مع شي صحاب قراب','الفن','العائلة','نأثّر فالعالم','كنهضر مع شي حد','كنكون مرتاح و واثق','حبة وحدة كبيرة','الإخلاص','الغدر','أه بزاف','ندور العالم','بتفاؤل كبير','نلقى نص الروح','العافية','السبع','الحمر','حدا البحر'];
   let done=false;
   for(const o of opts){const c=await p.getByText(o,{exact:true}).count().catch(()=>0); if(c>0){await p.getByText(o,{exact:true}).first().click();await sleep(300);done=true;break;}}
   if(!done) await sleep(300);
 }
 await p.getByText('شارك').first().waitFor({timeout:15000});
 await sleep(1500);
 await p.screenshot({path:'/home/user/ProjectSH/shots/result-check.png'});
 console.log('RESULT OK');
 await b.close();
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
