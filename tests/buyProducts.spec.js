// @ts-check
import { test, expect } from '@playwright/test';
import loginCredentials from '../utils/loginCredentials.json';
import { Saucedemo } from '../pageObjects/Saucedemo';
import { Constants } from '../utils/Constants';

test('Login and Buy Two Products', async ({ page }) => {
    // login success
    const saucedemo = new Saucedemo(page);
    await saucedemo.goToLoginPage()
    await saucedemo.submitSuccessLogin(loginCredentials[0].username, loginCredentials[0].password)
    // Add two products
    for (const productName of Constants.productNames) {
        await saucedemo.addItemToCart(productName);
    }
    expect(await saucedemo.shoppingCartIcon.innerText()).toBe(Constants.NUMBER_TWO);
    //check cart information
    await saucedemo.shoppingCartIcon.click()
    const cartItemNames = await saucedemo.cartItemNames.allInnerTexts();
    for (let i = 0; i < Constants.productNames.length; i++) {
        expect(cartItemNames[i]).toBe(Constants.productNames[i]);
    }
    //Check out part one
    await page.locator('button').getByText("Checkout").click();
    await saucedemo.fillCheckOutInformation("Ricardo", "Osegueda", "CP 1502")
    //check out part two
    const itemPriceSum = await saucedemo.calculateItemPriceSum()
    const subtotalNumber = await saucedemo.extractSubtotalNumber()
    expect(itemPriceSum).toEqual(subtotalNumber)
    //validate confirmation message
    await page.locator('button').getByText("Finish").click();
    const headerConfirmationMessage = "Thank you for your order!"
    const completeConfirmationMessage = "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    expect(headerConfirmationMessage).toBe(await saucedemo.headerConfirmationMsg.innerText())
    expect(completeConfirmationMessage).toBe(await saucedemo.completeConfirmationMsg.innerText())
    await page.pause()
});
