class Epam {
    constructor(webdriver, driver, timeout = 5000) {        
        this.timeout = timeout;
        this.driver = driver;
        this.webdriver = webdriver;
        this.url = 'https://www.epam.com/';
    }

    async quit() {
        await this.driver.quit();
    }

    async get(url) {
        await this.driver.get(url);
    }

    async getCurrentUrl() {
        return await this.driver.getCurrentUrl();
    }

    async wait(selector, elementName, timeout = 15000) {
        let result;
        await this.driver.wait(
            () =>
                this.driver.findElement(selector).then(
                    (element) => {
                        result = element;
                        return true;
                    },
                    (err) => {
                        if (err.name === "NoSuchElementError") {
                            return false;
                        }
                        return true;
                    }
                ),
            timeout,
            `Unable to find element: ${elementName}`
        );
        return result;
    }

    async elementByXpath(xpath, timeout = 5000) {
        const selector = this.webdriver.By.xpath(xpath);
        const result = await this.wait(selector, xpath, timeout);
        return result;
    }

    // Click when the element is displayed and enable.
    async click(element, timeout = 5000) {
        await this.driver.wait(
            this.webdriver.until.elementIsVisible(element),
            timeout
        );
        await this.driver.wait(
            this.webdriver.until.elementIsEnabled(element),
            timeout
        );

        await this.driver.executeScript('arguments[0].click();', element);
    }

   async elementIsVisible(element, timeout = 15000) {
        await this.driver.wait(
            this.webdriver.until.elementIsVisible(element),
            timeout
        );
    }

    async elementIsVisibleByXPath(xpath, timeout = 15000){
        const element = await this.elementByXpath(xpath);
        await this.elementIsVisible(element, timeout);
    }

    async clickOnSearch(sleepFor = 2500) {
        await this.driver.get("https://www.epam.com/");
        await this.driver.manage().window().setSize(640, 480);
        let searchIcon = await this.driver.findElement(this.webdriver.By.className("header-search__button header__icon")); 
        await this.click(searchIcon);
        await this.elementIsVisibleByXPath('/html/body/div[2]/div[2]/div[1]/header/div/ul/li[3]/div/div')
        await this.driver.sleep(sleepFor);
        return true;
    }

    async clickOnLogo(sleepFor = 2000) {
        await this.driver.get("https://www.epam.com/");
        await this.driver.manage().window().maximize();
        let searchIcon = await this.driver.findElement(this.webdriver.By.className("header__logo")); 
        await this.click(searchIcon);
        await this.driver.sleep(sleepFor);
        let result = await this.getCurrentUrl();
        return result;
    }

    async clickOnContactUs(sleepFor = 2000) {
        await this.driver.get("https://www.epam.com/");
        let contactUs = await this.driver.findElement(this.webdriver.By.xpath('/html/body/div[2]/div[2]/div[1]/header/div/ul/li[1]/a')); 
        await this.click(contactUs);
        await this.driver.sleep(sleepFor)
        let result = await this.getCurrentUrl();
        return result;
    }

    async clickOnLanguage(sleepFor = 1500) {
        await this.driver.get("https://www.epam.com/");
        await this.driver.manage().window().maximize();
        let indx;
        this.driver.sleep(sleepFor);
        await this.click(this.driver.findElement(this.webdriver.By.className("location-selector__button")));        
        for(indx in this.LANGUAGE_XPATH) {
            await this.elementIsVisibleByXPath(this.LANGUAGE_XPATH[indx]);
            this.driver.sleep(sleepFor);
        }
    await this.driver.sleep(sleepFor);
    return true;    
    }
}
