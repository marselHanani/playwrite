import { test, expect } from '@playwright/test';

import { LoginPage } from './page-objects/LoginPage';
import 'dotenv/config'

test.describe('Sort Feature',()=>{
    
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

test('sort from A to Z', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    await page.waitForTimeout(3000);
    const items = await page.$$('.inventory_item_name');
    await page.waitForTimeout(3000);
    const itemsText = await Promise.all(items.map(item => item.textContent()));
    await page.waitForTimeout(3000);
    const sortedItemsText = itemsText.sort();
    expect(itemsText).toEqual(sortedItemsText);
});
test('sort from high to low', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const items = await page.$$('.inventory_item_price');
    await page.waitForTimeout(3000);
    const itemsText = await Promise.all(items.map(item => item.textContent()));
    await page.waitForTimeout(3000);
    const sortedItemsText = itemsText.sort((a, b) => parseFloat(b!) - parseFloat(a!));
    expect(itemsText).toEqual(sortedItemsText);
});
});