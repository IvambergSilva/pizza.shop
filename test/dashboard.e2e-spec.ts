import { expect, Page, test } from '@playwright/test';
import { Login } from './utils/login.e2e-spec';

async function Dashboard(page: Page) {
    await Login(page)

    await page.goto('/', { waitUntil: 'networkidle' });
}

test('display month revenue amount metric', async ({ page }) => {
    await Dashboard(page)

    await expect(page.getByText('R$ 230,10')).toBeVisible()
    await expect(page.getByText('+20% em relação ao mês passado')).toBeVisible()
});

test('display month orders amount metric', async ({ page }) => {
    await Dashboard(page)

    await expect(page.getByText('30', { exact: true })).toBeVisible()
    await expect(page.getByText('+5% em relação ao mês passado')).toBeVisible()
});

test('display day orders amount metric', async ({ page }) => {
    await Dashboard(page)

    await expect(page.getByText('20', { exact: true })).toBeVisible()
    await expect(page.getByText('+5% em relação ao mês passado')).toBeVisible()
});

test('display month cancel orders amount metric', async ({ page }) => {
    await Login(page)

    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByText('40', { exact: true })).toBeVisible()
    await expect(page.getByText('+5% em relação ao mês passado')).toBeVisible()
});

