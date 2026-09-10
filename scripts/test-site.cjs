const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '@playwright/test');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8090/';
(async () => {
 const browser = await chromium.launch({ headless: true });
 const page = await browser.newPage();
 const errors=[]; const failures=[];
 page.on('pageerror',e=>errors.push(e.message));
 const pages=fs.readdirSync('.').filter(x=>x.endsWith('.html')&&x!=='404.html');
 let checks=0;
 for(const lang of ['th','en']) for(const width of [390,1440]) for(const file of pages){
   await page.setViewportSize({width,height:900});
   await page.goto(base+file+'?lang='+lang,{waitUntil:'domcontentloaded'});
   await page.waitForTimeout(120);
   const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('h1').length,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),missingIcons:[...document.querySelectorAll('use')].filter(i=>!document.getElementById(i.getAttribute('href')?.slice(1))).map(i=>i.getAttribute('href'))}));
   if(result.overflow||result.broken.length||result.missingIcons.length||result.h1!==1) failures.push({file,lang,width,...result}); checks++;
 }
 await page.goto(base+'index.html?lang=th');
 const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
 for(const href of new Set(links)){
   if(/^(https?:|mailto:|tel:|\?)/.test(href))continue;
   const url=new URL(href,base+'index.html');
   const response=await page.request.get(url.href);
   if(response.status()!==200)failures.push({brokenLink:href,status:response.status()});
   if(url.hash){const html=await response.text();if(!html.includes('id="'+url.hash.slice(1)+'"'))failures.push({missingAnchor:href});}
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('.ms-menu-toggle').click(); assert.equal(await page.locator('.ms-menu-toggle').getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');assert.equal(await page.locator('.ms-menu-toggle').getAttribute('aria-expanded'),'false');
 await page.locator('.ms-faq summary').first().click();assert.equal(await page.locator('.ms-faq').first().getAttribute('open'),'');
 await page.goto(base+'request-quotation.html?service=payroll-outsourcing&employees=120&package=pro&lang=th');
 assert.equal(await page.locator('[value="payroll-outsourcing"]').isChecked(),true);
 assert.equal(await page.locator('[name=employees]').inputValue(),'120');
 for(const [name,value] of Object.entries({company:'QA Example',name:'Test Contact',phone:'0980000000',email:'qa@example.test',requirement:'Example enquiry — automated test only'}))await page.locator(`[name=${name}]`).fill(value);
 await page.locator('button[type=submit]').click(); assert.equal(await page.locator('#quote-preview').isVisible(),true);
 assert.match(await page.locator('#email-draft').getAttribute('href'),/^mailto:Thanannaphat.m@gmail.com/);
 assert.match(await page.locator('#prepared-message').inputValue(),/120/);
 assert.match(await page.locator('#prepared-message').inputValue(),/Payroll package: pro/);
 await page.locator('[name=requirement]').fill('Changed draft');assert.equal(await page.locator('#quote-preview').isVisible(),false);
 await page.goto(base+'pricing.html?lang=th');
 for(const n of ['1','30','31','200','201','500','501']){
   await page.locator('#pax').fill(n);
   const prices=await page.locator('#packs .fee').allTextContents();
   const count=Number(n), rates=count<=200?[80,100,120]:count<=500?[65,90,100]:[50,70,80];
   [5000,10000,15000].forEach((v,i)=>assert.ok(prices[i].includes((v+Math.max(0,count-30)*rates[i]).toLocaleString('th-TH'))));
 }
 for(const n of ['0','-1','1.5','']){await page.locator('#pax').fill(n);assert.equal(await page.locator('#pax-error').isVisible(),true);assert.equal(await page.locator('#packs .ms-btn').count(),0);}
 await page.locator('#pax').fill('120');await page.locator('#packs .ms-btn').nth(1).click();assert.equal(await page.locator('[name=employees]').inputValue(),'120');
 console.log(JSON.stringify({responsivePageChecks:checks,jsErrors:errors,failures},null,2));
 await browser.close(); if(errors.length||failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
