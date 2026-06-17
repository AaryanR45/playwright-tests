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
import { modules, getModuleUrl } from "../testdata/visualModules";

test.describe("Module Visual Automation", () => {
  modules.forEach((module) => {
    test(`should validate ${module.name}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 906 });
      const moduleUrl = getModuleUrl(module);
      console.log(moduleUrl);
      await page.goto(moduleUrl);

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
        // Wait for animations to complete
        await page.waitForTimeout(3000);

        // Disable all animations and transitions on the page
        await page.evaluate(() => {
          const style = document.createElement("style");
          style.textContent = `
            *, *::before, *::after {
              animation: none !important;
              transition: none !important;
              animation-duration: 0s !important;
            }
          `;
          document.head.appendChild(style);
        });

        // Pause any videos and hide iframes that might be animating
        await page.evaluate(() => {
          const videos = document.querySelectorAll("video");
          videos.forEach((v) => v.pause());
          const iframes = document.querySelectorAll("iframe");
          iframes.forEach((i) => (i.style.display = "none"));
        });

        await page.waitForTimeout(1000);

        await expect(page).toHaveScreenshot(`${module.name}.png`, {
          fullPage: true,
          maxDiffPixels: 400,
          threshold: 0.3,
          timeout: 60000,
        });
      } else {
        const targetModule = page.locator(module.selector!);
        // Wait for element to be attached to DOM
        await targetModule.waitFor({ state: "attached" });
        // Wait for element to be visible
        await targetModule.waitFor({ state: "visible" });
        // Scroll element into view to ensure it's fully visible
        await targetModule.scrollIntoViewIfNeeded();

        // Wait for scroll to stabilize
        await page.waitForTimeout(500);

        // Disable animations on the element
        await page.evaluate(() => {
          const style = document.createElement("style");
          style.textContent = `
            *, *::before, *::after {
              animation: none !important;
              transition: none !important;
              animation-duration: 0s !important;
            }
          `;
          document.head.appendChild(style);
        });

        // Hide navbar to prevent overlap
        await page.evaluate(() => {
          const navbar = document.querySelector(".site-header") as HTMLElement;
          if (navbar) {
            navbar.style.display = "none";
          }
        });

        // Wait for page to stabilize
        await page.waitForTimeout(2000);
        await expect(targetModule).toHaveScreenshot(`${module.name}.png`, {
          maxDiffPixels: 400,
          threshold: 0.3,
          timeout: 60000,
        });
      }
    });
  });
});
