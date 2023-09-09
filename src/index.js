const puppeteer = require("puppeteer");
const hotWheelsFandom = "https://hotwheels.fandom.com/wiki/Bone_Shaker";

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(hotWheelsFandom);
  await page.setViewport({ width: 1366, height: 720 });
  await page.waitForSelector(".wikitable");

  const data = await page.evaluate(() => {
    const tablesList = document.querySelectorAll(".wikitable");
    let models = [];
    let year = "td:nth-child(2)";
    let toy_code = "td:nth-child(9)";
    let toy_image = "td:nth-child(12) a";
    let series = "td:nth-child(3)";
    let external_color = "td:nth-child(4)";
    let inner_color = "td:nth-child(5)";
    let tampo = "td:nth-child(6)";
    let details = "td:nth-child(7)";
    let wheel_type = "td:nth-child(8)";
    let madein = "td:nth-child(10)";
    let notes = "td:nth-child(11)";

    for (const table of tablesList) {
      let containsModel =
        table.querySelector("thead tr th") != null &&
        table.querySelector("thead tr th").innerText.indexOf("#") > 0;
      let carsList = table.querySelectorAll("tbody tr");

      if (containsModel) {
        for (const car of carsList) {
          models.push({
            // id: `${i}`,
            toy_code: `${car.querySelector(toy_code).innerText}`,
            toy_image: `${car.querySelector(toy_image).href}`,
            year: `${car.querySelector(year).innerText}`,
            // model: "open_roof",
            series: `${car.querySelector(series).innerText}`,
            external_color: `${car.querySelector(external_color).innerText}`,
            inner_color: `${car.querySelector(inner_color).innerText}`,
            tampo: `${car.querySelector(tampo).innerText}`,
            details: `${car.querySelector(details).innerText}`,
            wheel_type: `${car.querySelector(wheel_type).innerText}`,
            // wheel_image: "",
            madein: `${car.querySelector(madein).innerText}`,
            notes: `${car.querySelector(notes).innerText}`,
            // variations: [
            //   {
            //     toy_image: "",
            //     year: 2020,
            //     model: "closed_roof",
            //     series: "2006 First Editions 6/38",
            //     external_color: "black",
            //     inner_color: "Dark Chrome",
            //     tampo: "White Skull & Crossbones",
            //     details: "Unpainted/Metal",
            //     wheel_type: "5SP",
            //     wheel_image: "",
            //     madein: "Malaysia",
            //     notes: "",
            //   },
            // ],
          });
        }

        // let cellsList = row.querySelectorAll("td");
        //document.querySelector('#wonderful div:nth-child(2):nth-child(2)')
      }
    }

    return models;
  });

  console.log(data);

  await browser.close();
})();
