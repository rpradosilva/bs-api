const puppeteer = require("puppeteer");
const fs = require("fs");
const hotWheelsFandom = "https://hotwheels.fandom.com/wiki/Bone_Shaker";
const dataPath = "data.json";

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(hotWheelsFandom);
  await page.setViewport({ width: 1366, height: 720 });
  await page.waitForSelector(".wikitable");

  const data = await page.evaluate(() => {
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
    const tablesList = document.querySelectorAll(".wikitable");

    for (let i = 0; i < tablesList.length; i++) {
      let containsModel =
        tablesList[i].querySelector("thead tr th") != null &&
        tablesList[i].querySelector("thead tr th").innerText.indexOf("#") > 0;
      let carsList = tablesList[i].querySelectorAll("tbody tr");

      if (containsModel) {
        let defineModel = i === 0 || i === 3 ? "open roof" : "closed roof";

        for (const car of carsList) {
          models.push({
            toy_code: `${car.querySelector(toy_code).innerText}`,
            toy_image: `${car.querySelector(toy_image).href}`,
            year: `${car.querySelector(year).innerText}`,
            model: `${defineModel}`,
            series: `${car
              .querySelector(series)
              .innerText.replace(/(\r\n|\n|\r)/g, " ")
              .trim()}`,
            external_color: `${car.querySelector(external_color).innerText}`,
            inner_color: `${car.querySelector(inner_color).innerText}`,
            tampo: `${car
              .querySelector(tampo)
              .innerText.replace(/(\r\n|\n|\r)/g, " ")
              .trim()}`,
            details: `${car
              .querySelector(details)
              .innerText.replace(/(\r\n|\n|\r)/g, " ")
              .trim()}`,
            wheel_type: `${car
              .querySelector(wheel_type)
              .innerText.replace(/(\r\n|\n|\r)/g, " ")
              .trim()}`,
            madein: `${car.querySelector(madein).innerText}`,
            notes: `${car
              .querySelector(notes)
              .innerText.replace(/(\r\n|\n|\r)/g, " ")
              .trim()}`,
          });
        }
      }
    }

    for (let i = 0; i < models.length; i++) {
      models[i].id = i + 1;
    }

    return models;
  });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");

  await browser.close();
})();
