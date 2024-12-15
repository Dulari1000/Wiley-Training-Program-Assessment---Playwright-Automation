// Import necessary Playwright functions
const { chromium, test, expect } = require('@playwright/test');

// Test Case 1: Check Mathematics & Statistics Dropdown
test('Check Mathematics & Statistics dropdown', async ({ page }) => {
  const browser = await chromium.launch({ headless: false }); // Launch the browser in headful mode
  const context = await browser.newContext();
  // Use the page provided by the test function, no need to create a new one
  // const page = await context.newPage();
  
  try {
    console.log('Navigating to Wiley Online Library...');
    await page.goto('https://onlinelibrary.wiley.com/');
    await page.waitForLoadState('domcontentloaded');

    console.log('Clicking Mathematics & Statistics dropdown...');
    const dropdownSelector = 'text=Mathematics & Statistics';
    await page.click(dropdownSelector);

    console.log('Waiting for Mathematics to appear...');
    const expandedPanelSelector = 'text=Mathematics';
    await page.waitForSelector(expandedPanelSelector);

    const isMathematicsVisible = await page.isVisible(expandedPanelSelector);
    expect(isMathematicsVisible).toBeTruthy();
    console.log('"Mathematics" is visible in the dropdown.');
    console.log(' Mathematics & Statistics dropdown test passed.');
  } catch (error) {
    console.log(' Mathematics & Statistics dropdown test failed.');
    throw error;
  } finally {
    await browser.close(); // Close the browser after the test
  }
});

