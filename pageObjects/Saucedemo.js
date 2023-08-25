// const {test, expect} = require('@playwright/test');

class Saucedemo {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('input[data-test="username"]');
        this.passwordField = page.locator('input[data-test="password"]');
        this.loginBtn = page.locator('input[data-test="login-button"]');
    }

    async goToLoginPage() {

        await this.page.goto("https://www.saucedemo.com/");
    }

    async submitSuccessLogin(userName, password) {
        await this.usernameField.type(userName)
        await this.passwordField.type(password)
        await this.loginBtn.click()
        await this.page.waitForURL('**/inventory.html')
    }
    async addItemToCart(productName) {
        const elementLocator = this.page.locator(`//*[text()="${productName}"]/ancestor::div[@class="inventory_item_description"]`);
        await elementLocator.locator('//button').click();
    }
}

module.exports = { Saucedemo };
