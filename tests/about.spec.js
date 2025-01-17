// @ts-check
const { test, expect } = require('@playwright/test');

const HOME_PAGE = 'http://127.0.0.1:8080/'
const ABOUT_PAGE = `${HOME_PAGE}about/index.html`

test('About displays Hello Universe', async ({ page }) => {
  await page.goto(ABOUT_PAGE);

  await expect(page.getByText('Hello Universe')).toBeVisible();
});

test('About has a back link', async ({ page }) => {
  await page.goto(ABOUT_PAGE);

  await page.isVisible("[id='backbutton']");
});

test('I can navigate from About to Home', async ({ page }) => {
  await page.goto(ABOUT_PAGE);

  await page.click("[id='backbutton']");

  await expect(page).toHaveURL(new RegExp(`${HOME_PAGE}index.html`));
});