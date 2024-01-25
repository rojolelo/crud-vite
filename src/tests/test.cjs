var assert = require("assert");
const { it } = require("mocha");
var webdriver = require("selenium-webdriver");

const url = "http://localhost:5173";

describe("Log in test", () => {
  it("should find LOG OUT text", async () => {
    var driver = new webdriver.Builder().forBrowser("chrome").build();

    await driver.manage().setTimeouts({ implicit: 3000 });
    await driver.get(url);
    const loginButton = await driver.findElement(
      webdriver.By.xpath('//*[@id="root"]/button')
    );
    await loginButton.click();

    const emailField = await driver.findElement(
      webdriver.By.xpath('//*[@id="1-email"]')
    );
    await emailField.sendKeys("test@test.com");

    const passField = await driver.findElement(
      webdriver.By.xpath('//*[@id="1-password"]')
    );
    await passField.sendKeys("r!K%8Uh2wf5!Lc3Z");

    const submitLogin = await driver.findElement(
      webdriver.By.xpath('//*[@id="1-submit"]')
    );
    await submitLogin.click();

    const table = await driver.findElement(
      webdriver.By.xpath('//*[@id="root"]/div')
    );

    await driver.wait(webdriver.until.elementIsVisible(table), 2000);

    const logoutButton = await driver.findElement(
      webdriver.By.xpath('//*[@id="root"]/button')
    );

    const logOutButtonText = await logoutButton.getText();

    assert(logOutButtonText == "LOG OUT");

    setTimeout(function () {
      driver.quit();
    }, 10000);
  });
});
