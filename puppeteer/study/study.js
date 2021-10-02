const puppeteer = require('puppeteer');
puppeteer.launch({
  headless: false,
  slowMo: 250 // slow down by 250ms
}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('http://www.google.com', {waitUntil: 'networkidle2'});
  await page.type('headless Chrome puppeteer');
  await page.click('input[type="submit"]');
  await page.waitForNavigation();
  await page.screenshot({path: 'search_result.png'});
  browser.close();
});