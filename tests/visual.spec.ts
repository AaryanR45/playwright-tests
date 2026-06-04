import { test, expect } from '@playwright/test';

test.describe('Module Visual Automation', () => {
  test('should validate footer', async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 900 });
    // 1. Navigate to the page containing your module
    await page.goto('https://dev-appian-team-a.pantheonsite.io/home/');
    await page.locator('button.pds-button',{hasText: 'Continue' }).click();

    // 2. Locate the specific module/component boundary
    const targetModule = page.locator('.site-footer__inner');

    // 3. Ensure the module is stable and fully visible
    await targetModule.waitFor({ state: 'visible' });

    // 4. Perform the visual comparison assertion
    await expect(targetModule).toHaveScreenshot('site-footer__inner.png', {
      maxDiffPixels: 100,      // Acceptable small sub-pixel rendering differences
      threshold: 0.2,          // Sensitiveness threshold from 0 to 1 (Pixelmatch)
    });
  });
}); 