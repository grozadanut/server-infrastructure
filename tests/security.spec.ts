import { test, expect } from '@playwright/test';

test('login fail with non-existent user', async ({ page }) => {
  await page.goto(`/`);
  await page.getByRole('textbox', { name: 'Username' }).fill('notauser');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading')).toContainText('No account found for username notauser');
});

test('login success with john.doe', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Choose an Application')).toBeVisible();
});

test('login success with 2FA: single use code', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('sheldon.acme');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.locator('#user-panel-tabpanel').getByText('Account').click();
  await page.getByRole('button', { name: 'Add Single Use Codes' }).click();
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  var code = (await page.getByRole('listitem').textContent()) ?? '';
  await page.goto('/Login/logout');
  await page.getByRole('textbox', { name: 'Username' }).fill('sheldon.acme');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Authentication Code' }).click();
  await page.getByRole('textbox', { name: 'Authentication Code' }).fill(code);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('/Login/logout');
  await page.getByRole('textbox', { name: 'Username' }).fill('sheldon.acme');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Choose an Application' )).toBeVisible();
});