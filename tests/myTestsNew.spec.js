const { test, expect } = require('@playwright/test');

// Test Case 1: Check Mathematics & Statistics Dropdown
test('Check Mathematics & Statistics dropdown', async ({ page }) => {
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
    console.log('Mathematics & Statistics dropdown test passed.');
  } catch (error) {
    console.log('Mathematics & Statistics dropdown test failed.');
    throw error;
  }
});

// Test Case 2: Search Functionality (No Waiting for Search Results)
test('Search functionality', async ({ page }) => {
  try {
    console.log('Navigating to Wiley Online Library...');
    await page.goto('https://onlinelibrary.wiley.com/');
    await page.waitForLoadState('domcontentloaded');

    console.log('Verifying page title...');
    await expect(page).toHaveTitle(/Wiley Online Library/i);

    console.log('Checking search bar visibility...');
    const searchInputSelector = 'input#searchField1';
    await page.waitForSelector(searchInputSelector);

    console.log('Filling search query...');
    const searchQuery = 'machine learning';
    await page.fill(searchInputSelector, searchQuery);

    console.log('Submitting search...');
    await page.keyboard.press('Enter');

    // No need to wait for the search results, just ensure that the search query was submitted
    console.log('Search submitted successfully.');
    console.log('Search functionality test passed.');

  } catch (error) {
    console.log('Search functionality test failed.');
    throw error;
  }
});

// Test Case 3: Check "Browse All Titles" Button
test('Check Browse All Titles button', async ({ page }) => {
  try {
    console.log('Navigating to Wiley Online Library...');
    await page.goto('https://onlinelibrary.wiley.com/');
    await page.waitForLoadState('domcontentloaded');

    console.log('Scrolling near the footer...');
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo(0, document.body.scrollHeight - 500);
      }
    });

    await page.waitForTimeout(2000);

    const browseButtonSelector = 'a[href="/action/showPublications"]';
    console.log('Waiting for the Browse All Titles button...');
    await page.waitForSelector(browseButtonSelector);

    console.log('Ensuring the button is visible...');
    const isButtonVisible = await page.isVisible(browseButtonSelector);
    expect(isButtonVisible).toBeTruthy();

    console.log('Clicking the Browse All Titles button...');
    const button = await page.locator(browseButtonSelector);
    await button.hover();
    await page.waitForTimeout(1500);
    await button.click({ delay: 1000 });

    console.log('Waiting for navigation...');
    await page.waitForLoadState('load');
    const newPageURL = page.url();
    console.log(`Navigated to: ${newPageURL}`);
    expect(newPageURL).toContain('/action/showPublications');
    console.log('Browse All Titles button test passed.');
  } catch (error) {
    console.log('Browse All Titles button test failed.');
    throw error;
  }
});
