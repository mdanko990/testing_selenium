describe("Epam's website testing", function(){
  const webdriver = require("selenium-webdriver");
  const driver = new webdriver.Builder().forBrowser('firefox').build();
  const epam = new epam(webdriver, driver);

  beforeEach(function(){
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
  });

  it("Open home page by clicking on logo icon", async => {
    expect(await epam.clickOnLogo().toEqual('https://www.epam.com/'));
  });

  it("Open language submenu", async => {
    expect(await epam.clickOnLanguage()).toEqual(true);
  });

  it("Open contactUs page", async => {
    expect(await epamPageObject.clickOnContactUs()).toEqual('https://www.epam.com/about/who-we-are/contact');
  });

  it("Load search form", async =>{
    expect(await epamPageObject.clickOnSearch()).toEqual(true);
  })

});