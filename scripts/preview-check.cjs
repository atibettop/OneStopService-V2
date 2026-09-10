const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '@playwright/test');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8090/',{waitUntil:'networkidle'});
 await page.screenshot({path:'preview-desktop.png',fullPage:true});
 console.log(JSON.stringify({title:await page.title(),errors,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'preview-mobile.png',fullPage:true});
 await page.locator('.ms-menu-toggle').click();
 console.log('mobile menu',await page.locator('.ms-menu-toggle').getAttribute('aria-expanded'));
 await page.keyboard.press('Escape');
 console.log('mobile overflow',await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
 await browser.close();
})();
