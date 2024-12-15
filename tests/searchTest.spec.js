const { chromium, test, expect } = require('@playwright/test');

test('Search for articles on Wiley Online Library', async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
    slowMo: 100,
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to Wiley Online Library...');
    await page.goto('https://onlinelibrary.wiley.com/', { timeout: 60000 });

    console.log('Verifying page title...');
    await expect(page).toHaveTitle(/Wiley Online Library/i);

    console.log('Checking search bar visibility...');
    const searchInputSelector = 'input#searchField1';
    await page.waitForSelector(searchInputSelector, { timeout: 15000 });
    const searchBarVisible = await page.isVisible(searchInputSelector);
    expect(searchBarVisible).toBe(true);

    console.log('Filling search query...');
    const searchQuery = 'machine learning';
    await page.fill(searchInputSelector, searchQuery);

    console.log('Submitting search...');
    await page.keyboard.press('Enter');

    console.log('Waiting for search results...');
    await page.waitForSelector('.search-results', { timeout: 20000 });

    console.log('Extracting article titles...');
    const articleTitles = await page.$$eval('.search-results .article-title', (articles) =>
      articles.map((article) => article.textContent.trim()) 
    );

    if (articleTitles.length > 0) {
      console.log(`Found ${articleTitles.length} articles:`);
      articleTitles.forEach((title, index) => console.log(`${index + 1}. ${title}`));
    } else {
      console.log('No articles found.');
    }
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    console.log('Closing browser...');
    await browser.close();
  }
});
