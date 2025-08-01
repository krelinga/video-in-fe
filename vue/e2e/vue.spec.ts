import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('You did it!');
})

test('displays environment variable', async ({ page }) => {
  await page.goto('/');
  
  // Check that the environment display component is present
  await expect(page.locator('.env-display')).toBeVisible();
  await expect(page.locator('.env-display h3')).toContainText('Environment Variable Demo');
  
  // Check that FOO_VAR is displayed (value will depend on how the test is run)
  const fooVarElement = page.locator('.env-display .flex span:nth-child(2)');
  await expect(fooVarElement).toBeVisible();
})
