const { chromium } = require('/tmp/node_modules/playwright');
const EXEC='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const p=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2}).then(c=>c.newPage());
 await p.addInitScript(()=>{ window.__spoken=[]; const s=window.speechSynthesis; if(s){const o=s.speak.bind(s); s.speak=u=>{try{window.__spoken.push(u.text)}catch(e){} return o(u)}};});
 await p.goto('http://127.0.0.1:8099/',{waitUntil:'load'});
 await p.getByText('مولات النية').first().waitFor(); await sleep(800);
 await p.getByText('هضر مع مولات النية').first().click(); await sleep(900);
 // type a question (AI not configured -> local fallback in darija)
 await p.getByText('كتب بدل الصوت').first().click(); await sleep(400);
 await p.locator('input').first().fill('واش غادي نلقى الحب؟');
 await p.locator('input').first().press('Enter');
 await sleep(2500);
 await p.screenshot({path:'/home/user/ProjectSH/shots/voice-final.png'});
 const spoken = await p.evaluate(()=>window.__spoken||[]);
 console.log('SPOKEN:', JSON.stringify(spoken));
 // check no emoji in spoken text
 const emojiRe=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u;
 console.log('HAS_EMOJI_IN_SPEECH:', spoken.some(t=>emojiRe.test(t)));
 await b.close(); console.log('DONE');
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
