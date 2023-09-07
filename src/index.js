const puppeteer = require("puppeteer");
const hotWheelsFandom = "https://hotwheels.fandom.com/wiki/Bone_Shaker";

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(hotWheelsFandom);
  await page.setViewport({ width: 1080, height: 1024 });
  await page.waitForSelector(".wikitable");

  const data = await page.$$eval(".wikitable thead tr th", (data) => {
    return data.map((table) => table.innerText);
  });

  // const data = await page.evaluate(() => {
  //   // const tablesList = Array.from(
  //   //   document.querySelectorAll(".wikitable thead tr th")
  //   // );
  //   // const tables = tablesList.map((table) => ({ src: table.innerText }));
  //   // return teste;
  // });

  console.log(data[0]);

  await browser.close();
})();
