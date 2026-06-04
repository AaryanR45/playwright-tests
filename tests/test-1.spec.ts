import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('button', { name: '＋ Add User' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Aaryan Risal');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('aaryan@gmail.com');
  await page.getByLabel('Role').selectOption('Editor');
  await page.getByLabel('Status').selectOption('Inactive');
  await page.getByRole('button', { name: 'Create User' }).click();
  await expect(page.getByText('✓ User created successfully')).toBeVisible();
  await page.getByRole('button', { name: 'View' }).first().click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Aaryan');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByText('✓ User updated successfully')).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.locator('.modal-actions > .btn.btn-danger').click();
  await expect(page.getByText('✓ User deleted')).toBeVisible();
});