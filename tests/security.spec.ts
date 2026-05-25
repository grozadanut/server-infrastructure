import { test, expect } from '@playwright/test';

test('login fail with non-existent user', async ({ page }) => {
  await page.goto(`/apps`);
  await page.getByRole('textbox', { name: 'Username' }).fill('notauser');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading')).toContainText('No account found for username notauser');
});

test('login success with john.doe', async ({ page }) => {
  await page.goto('/apps');
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Choose an Application')).toBeVisible();
});

test('login success with 2FA: single use code', async ({ page }) => {
  await page.goto('/apps');
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.getByRole('button', { name: 'Add Single Use Codes' }).click();
  await page.getByLabel('Number of Codes').fill('2');
  await page.locator('#CreateUserAuthcFactorSingleUse_submitButton').click();
  const code = (await page.locator('.col-lg-4').first().textContent())?.trim() ?? '';
  //const code2 = (await page.locator('.row > div:nth-child(2)').first().textContent())?.trim() ?? '';
  await page.goto('/Login/logout');
  await page.goto('/apps');
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Authentication Code' }).fill("wrongcode");
  await page.getByRole('button', { name: 'Sign in' }).click();
  // await expect(page.getByRole('heading')).toContainText('Authentication code is not valid');
  await expect(page.getByText('An authentication code is required for your account, you have these options:')).toBeVisible();
  await expect(page.getByText('Single Use Code')).toBeVisible();
  await page.getByRole('textbox', { name: 'Authentication Code' }).fill(code);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Choose an Application' )).toBeVisible();
  await page.goto('/Login/logout');
  await page.goto('/apps');
  // device should be remembered(trusted) for 30 days, so no 2FA should be required
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Choose an Application' )).toBeVisible();
  // cleanup
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.locator('#UserAuthcFactorList_delete_0').click();
});

test('dont require email 2FA if not validated', async ({ page }) => {
  await page.goto('/apps');
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.getByRole('button', { name: 'Add Email Factor' }).click();
  await page.locator('#CreateUserAuthcFactorEmail_submitButton').click();
  await page.goto('/Login/logout');
  await page.goto('/apps');
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Choose an Application' )).toBeVisible();
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByText('Send new code to john.doe@').click();
  await page.goto('/Login/logout');
  await page.goto('/apps');
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Password' }).fill('moqui');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Choose an Application' )).toBeVisible();
  // cleanup
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.locator('#UserAuthcFactorList_delete_0').click();
});