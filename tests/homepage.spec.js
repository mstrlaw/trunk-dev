// @ts-check
const { test, expect } = require('@playwright/test');

const START_PAGE = 'http://127.0.0.1:8080/'

test('Homepage displays Hello World', async ({ page }) => {
  await page.goto(START_PAGE);

  await expect(page.getByText('Hello World')).toBeVisible();
});

test('Homepage has a navigation link', async ({ page }) => {
  await page.goto(START_PAGE);

  await page.isVisible("[id='someaction']");
});

test('I can navigate to the About page', async ({ page }) => {
  await page.goto(START_PAGE);

  await page.click("[id='someaction']");

  await expect(page).toHaveURL(/\/about/);
});