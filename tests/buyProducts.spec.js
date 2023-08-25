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
    await page.locator(Constants.BUTTON).getByText(Constants.CHECKOUT).click();
    await saucedemo.fillCheckOutInformation(Constants.RICARDO, Constants.OSEGUEDA, Constants.CP_1502)
    //check out part two
    const itemPriceSum = await saucedemo.calculateItemPriceSum()
    const subtotalNumber = await saucedemo.extractSubtotalNumber()
    expect(itemPriceSum).toEqual(subtotalNumber)
    //validate confirmation message
    await page.locator(Constants.BUTTON).getByText(Constants.FINISH).click();
    expect(Saucedemo.headerConfirmationMessage).toBe(await saucedemo.headerConfirmationMsg.innerText())
    expect(Saucedemo.completeConfirmationMessage).toBe(await saucedemo.completeConfirmationMsg.innerText())
});
