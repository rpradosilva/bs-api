const puppeteer = require("puppeteer");
const fs = require("fs");
const targets = JSON.parse(fs.readFileSync("./src/config/targets.json"));

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.goto(targets.url);
  await page.waitForSelector(".table-wide-inner table tr th");

  await page.evaluate(() => {
    const nodeList = document.querySelectorAll(".table-wide-inner table tr th");

    let trArray = Array.from(nodeList);

    console.log(trArray[3].innerText);
  });

  // console.log(nodeList);

  // await browser.close();
})();
