const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE='http://127.0.0.1:8099/';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852}}).then(c=>c.newPage());
 // instrument speechSynthesis.speak before app loads
 await p.addInitScript(()=>{
   window.__spoken=[];
   const orig = window.speechSynthesis && window.speechSynthesis.speak;
   if (orig) {
     window.speechSynthesis.speak = function(u){
       try{ window.__spoken.push({text:(u&&u.text)||'', lang:(u&&u.lang)||'', voice:(u&&u.voice&&u.voice.name)||null}); }catch(e){}
       return orig.call(this,u);
     };
   }
 });
 await p.goto(BASE,{waitUntil:'load'});
 await p.getByText('مولات النية').first().waitFor(); await sleep(800);
 const voices = await p.evaluate(()=> (window.speechSynthesis?window.speechSynthesis.getVoices():[]).map(v=>v.lang+':'+v.name));
 console.log('VOICES_COUNT', voices.length);
 console.log('ARABIC_VOICES', voices.filter(v=>v.toLowerCase().startsWith('ar')));
 await p.getByText('هضر مع مولات النية').first().click(); await sleep(800);
 // click "tap to start"
 const tap = p.getByText('كبس باش تسمع مولات النية').first();
 if (await tap.count()) { await tap.click(); console.log('CLICKED tapToStart'); }
 await sleep(1200);
 const spoken = await p.evaluate(()=>window.__spoken||[]);
 console.log('SPEAK_CALLS', JSON.stringify(spoken,null,0));
 await b.close();
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
