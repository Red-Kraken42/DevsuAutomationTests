// @ts-check
const { test, expect } = require('@playwright/test');

test('Login and Buy Two Products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('input[data-test="username"]').type('standard_user')
    await page.locator('input[data-test="password"]').type('secret_sauce')
    await page.locator('input[data-test="login-button"]').click()
    await page.pause()
});
