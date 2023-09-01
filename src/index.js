const puppeteer = require("puppeteer");
const spinnies = require("./config/spinnies");
const fs = require("fs");
const messages = JSON.parse(fs.readFileSync("./src/config/messages.json"));
const target = JSON.parse(fs.readFileSync("./src/config/targets.json"));

(async () => {
  spinnies.add(messages.puppeteer.init.id, {
    text: messages.puppeteer.init.text.add,
  });
  const browser = await puppeteer.launch({ headless: "new" });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  spinnies.succeed(messages.puppeteer.init.id, {
    text: messages.puppeteer.init.text.succeed,
  });

  spinnies.add(messages.puppeteer.close.id, {
    text: messages.puppeteer.close.text.add,
  });
  await browser.close();
  spinnies.succeed(messages.puppeteer.close.id, {
    text: messages.puppeteer.close.text.succeed,
  });
})();
