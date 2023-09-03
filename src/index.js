const tabletojson = require("tabletojson").Tabletojson;
const fs = require("fs");
const url = "https://hotwheels.fandom.com/wiki/Bone_Shaker";
const dataPath = "data.json";
let data = [];

tabletojson.convertUrl(url, function (tablesAsJson) {
  for (const table of tablesAsJson) {
    if (JSON.stringify(table).indexOf("Col #") !== -1) {
      data.push(table);
    }
  }

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
});
