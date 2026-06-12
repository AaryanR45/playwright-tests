// import { test, expect } from '@playwright/test';

// test.describe('Module Visual Automation', () => {
//   test('should validate footer', async ({ page }) => {
//     await page.setViewportSize({
//       width: 1440,
//       height: 900 });
//     // 1. Navigate to the page containing your module
//     await page.goto('https://dev-appian-team-a.pantheonsite.io/home/');
//     await page.locator('button.pds-button',{hasText: 'Continue' }).click();

//     // 2. Locate the specific module/component boundary
//     const targetModule = page.locator('.site-footer__inner');

//     // 3. Ensure the module is stable and fully visible
//     await targetModule.waitFor({ state: 'visible' });

//     // 4. Perform the visual comparison assertion
//     await expect(targetModule).toHaveScreenshot('site-footer__inner.png', {
//       maxDiffPixels: 100,      // Acceptable small sub-pixel rendering differences
//       threshold: 0.2,          // Sensitiveness threshold from 0 to 1 (Pixelmatch)
//     });
//   });
// });

import { test, expect } from "@playwright/test";
import { modules } from "../testdata/visualModules";

test.describe("Module Visual Automation", () => {
  modules.forEach((module) => {
    test(`should validate ${module.name}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 820 });
      await page.goto(module.url);

      // Click continue button if it exists
      const continueButton = page.locator("button.pds-button", {
        hasText: "Continue",
      });
      if (await continueButton.isVisible()) {
        await continueButton.click();
      }

      // Handle full-page or module-specific screenshot
      if (module.fullPage) {
        await page.waitForLoadState("load");
        // Wait for page to be fully loaded and stable
        await page.waitForLoadState("networkidle");
        // Small delay to allow animations to complete
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(`${module.name}.png`, {
          fullPage: true,
          maxDiffPixels: 100,
          threshold: 0.2,
        });
      } else {
        const targetModule = page.locator(module.selector!);
        await targetModule.waitFor({ state: "visible" });
        // Wait for page to be fully loaded and stable
        await page.waitForLoadState("networkidle");
        // Small delay to allow animations to complete
        await page.waitForTimeout(500);
        await expect(targetModule).toHaveScreenshot(`${module.name}.png`, {
          maxDiffPixels: 100,
          threshold: 0.2,
        });
      }
    });
  });
});

