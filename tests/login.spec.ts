import { test, expect } from '@playwright/test';
import 'dotenv/config'
import { LoginPage } from './page-objects/LoginPage';

test('login with invalid username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user', process.env.PASSWORD!);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('login with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, 'wrong_password');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('login with empty username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', '');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('successful login redirects to inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", process.env.PASSWORD!);
  await expect(page).toHaveURL(/inventory/);
});
