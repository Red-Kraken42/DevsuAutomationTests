// @ts-check
import { test, expect } from '@playwright/test';
import loginCredentials from '../utils/loginCredentials.json';
import { Saucedemo } from '../pageObjects/Saucedemo';

test('Login and Buy Two Products', async ({ page }) => {
    // login success
    const saucedemo = new Saucedemo(page);
    await saucedemo.goToLoginPage()
    await saucedemo.submitSuccessLogin(loginCredentials[0].username,loginCredentials[0].password)
    // Add two products
    console.log(await page.locator('//div[@class="inventory_item_description"]').count());
    const elementLocator1 = page.locator('//*[text()="Sauce Labs Backpack"]/ancestor::div[@class="inventory_item_description"]')
    const elementLocator2 = page.locator('//*[text()="Sauce Labs Onesie"]/ancestor::div[@class="inventory_item_description"]')

    await elementLocator1.locator('//button').click()
    await elementLocator2.locator('//button').click()
    await page.pause()
});
