import { test, expect } from '@playwright/test';

const BASE_URL = '/';

test('has correct title', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle(/FE Template/);
});

test('connection to backend', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.getByRole('heading', { name: /connection works/i })).toBeVisible();
});

test('can submit name and receive a response', async ({ page }) => {
    await page.goto(BASE_URL);

    // fill form
    const name = 'Greg';
    await page.getByLabel(/first name:/i).fill(name);

    // submit
    await page.getByRole('button', { name: /submit/i }).click();

    // received notification
    await expect(page.getByRole('heading', { name: `Hi there ${name}` })).toBeVisible();
});
