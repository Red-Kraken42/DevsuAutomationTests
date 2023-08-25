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
    await saucedemo.addItemToCart("Sauce Labs Backpack")
    await saucedemo.addItemToCart("Sauce Labs Onesie")
    await page.pause()
});
