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
    // await page.locator('input[data-test="firstName"]').type("Ricardo")
    // await page.locator('input[data-test="lastName"]').type("Osegueda")
    // await page.locator('input[data-test="postalCode"]').type("CP 1502")
    // await page.locator('input[data-test="continue"]').click()
    await saucedemo.fillCheckOutInformation("Ricardo","Osegueda","CP 1502")

    //check out part two
    const priceText1 = await page.locator('div.inventory_item_price').nth(0).innerText();
    const priceNumber1 = parseFloat(priceText1.replace('$', ''));
    const priceText2 = await page.locator('div.inventory_item_price').nth(0).innerText();
    const priceNumber2 = parseFloat(priceText2.replace('$', ''));

    const totalPrice = priceNumber1 + priceNumber2;
    console.log(totalPrice);
    console.log(await page.locator('div.summary_subtotal_label').innerText());

    await page.locator('button').getByText("Finish").click();
    console.log(await page.locator('h2.complete-header').nth(0).innerText());
    console.log(await page.locator('div.complete-text').nth(0).innerText());
    await page.pause()
});
