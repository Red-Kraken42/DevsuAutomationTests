// const {test, expect} = require('@playwright/test');

class Saucedemo {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('input[data-test="username"]');
        this.passwordField = page.locator('input[data-test="password"]');
        this.loginBtn = page.locator('input[data-test="login-button"]');
        this.shoppingCartIcon = page.locator('a.shopping_cart_link');
        this.btn = page.locator('button')
        this.cartItem = page.locator('div.cart_item')
        this.itemName = page.locator('.inventory_item_name')
        this.cartItemNames = page.locator('div.cart_item').locator('.inventory_item_name')
        this.fistNameField = page.locator('input[data-test="firstName"]')
        this.lastNameField = page.locator('input[data-test="lastName"]')
        this.zipPostalCodeField = page.locator('input[data-test="postalCode"]')
        this.continueBtn = page.locator('input[data-test="continue"]')

    }
    // Login Page
    async goToLoginPage() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async submitSuccessLogin(userName, password) {
        await this.usernameField.type(userName)
        await this.passwordField.type(password)
        await this.loginBtn.click()
        await this.page.waitForURL('**/inventory.html')
    }
    // Inventory Page
    async addItemToCart(productName) {
        const elementLocator = this.page.locator(`//*[text()="${productName}"]/ancestor::div[@class="inventory_item_description"]`);
        await elementLocator.locator('//button').click();
    }

    //check out page 1
    async fillCheckOutInformation(firstName, lastName, zipPostalCode) {
        await this.fistNameField.type(firstName)
        await this.lastNameField.type(lastName)
        await this.zipPostalCodeField.type(zipPostalCode)
        await this.continueBtn.click()
    }
}

module.exports = { Saucedemo };
