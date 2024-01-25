var assert = require("assert");
const { it } = require("mocha");
var webdriver = require("selenium-webdriver");

//Make sure to update the URL after the server is running if needed
const url = "http://localhost:5173";

describe("Log in test", () => {
  it("should find LOG OUT text", async () => {
    var driver = new webdriver.Builder().forBrowser("chrome").build();

    // Wait/Timeout config
    await driver.manage().setTimeouts({ implicit: 3000 });

    //Loads website
    await driver.get(url);

    //Find Log In Button and Click
    const loginButton = await driver.findElement(
      webdriver.By.xpath('//*[@id="root"]/button')
    );
    await loginButton.click();

    //Add Log In information and submit
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

    //Detect if the table is showing up
    const table = await driver.findElement(
      webdriver.By.xpath('//*[@id="root"]/div')
    );

    await driver.wait(webdriver.until.elementIsVisible(table), 2000);

    // Looks for the LOG OUT button to verify the tester is already logged in
    const logoutButton = await driver.findElement(
      webdriver.By.xpath('//*[@id="root"]/button')
    );
    const logOutButtonText = await logoutButton.getText();

    // Button text verification
    assert(logOutButtonText == "LOG OUT");

    setTimeout(function () {
      driver.quit();
    }, 10000);
  });
});
