import { test, expect } from '@playwright/test';

import { LoginPage } from './page-objects/LoginPage';
import 'dotenv/config'

test.describe('Sort Feature',()=>{
    
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USER_NAME!,process.env.PASSWORD!);
  });

test('sort from A to Z', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const items = await page.$$('.inventory_item_name');
    const itemsText = await Promise.all(items.map(item => item.textContent()));
    const sortedItemsText = itemsText.sort();
    expect(itemsText).toEqual(sortedItemsText);
});
test('sort from high to low', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const items = await page.$$('.inventory_item_price');
    const itemsText = await Promise.all(items.map(item => item.textContent()));
    const sortedItemsText = itemsText.sort((a, b) => parseFloat(b!) - parseFloat(a!));
    expect(itemsText).toEqual(sortedItemsText);
});
});