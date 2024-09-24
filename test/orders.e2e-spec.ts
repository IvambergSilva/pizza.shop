import { expect, Page, test } from '@playwright/test';
import { Login } from './utils/login.e2e-spec';

async function Orders(page: Page) {
    await Login(page)

    await page.goto('/orders', { waitUntil: 'networkidle' });
}

test('list orders', async ({ page }) => {
    await Orders(page)

    await expect(page.getByRole('cell', { name: 'Customer - 1', exact: true })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Customer - 10', exact: true })).toBeVisible()
});

test('paginate orders', async ({ page }) => {
    await Orders(page)

    await expect(page.getByText('Total de 50 itens')).toBeVisible()

    await page.getByRole('button', { name: 'Próxima página' }).click()

    await expect(page.getByRole('cell', { name: 'Customer - 11', exact: true })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Customer - 20', exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Última página' }).click()

    await expect(page.getByText('Página 5 de 5')).toBeVisible()

    await expect(page.getByRole('cell', { name: 'Customer - 41', exact: true })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Customer - 50', exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Página anterior' }).click()

    await expect(page.getByText('Página 4 de 5')).toBeVisible()

    await expect(page.getByRole('cell', { name: 'Customer - 31', exact: true })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Customer - 40', exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Primeira página' }).click()

    await expect(page.getByText('Página 1 de 5')).toBeVisible()

    await expect(page.getByRole('cell', { name: 'Customer - 1', exact: true })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Customer - 10', exact: true })).toBeVisible()
});

test('filter by id', async ({ page }) => {
    await Orders(page)

    await page.getByPlaceholder('ID do pedido').fill('order-19')

    await page.getByRole('button', { name: 'Filtrar resultados' }).click()

    await expect(page.getByRole('cell', { name: 'Customer - 19', exact: true })).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
    await Orders(page)

    await page.getByPlaceholder('Nome do cliente').fill('Customer - 23')

    await page.getByRole('button', { name: 'Filtrar resultados' }).click()

    await expect(page.getByRole('cell', { name: 'Customer - 23', exact: true })).toBeVisible()
})

test('filter by status "pending"', async ({ page }) => {
    await Orders(page)

    await page.locator('button').filter({ hasText: 'Todos os status' }).click()

    await page.getByLabel('Pendente').click()

    await page.getByRole('button', { name: 'Filtrar resultados' }).click()

    await expect(page.getByRole('cell', { name: 'Pendente' })).toHaveCount(10)
})

test('filter by price sorting "desc"', async ({ page }) => {
    await Orders(page)

    await page.locator('button').filter({ hasText: 'Classificar por preço' }).click()

    await page.getByLabel('Maior para o menor').click()

    await page.getByRole('button', { name: 'Filtrar resultados' }).click()

    await expect(page.getByRole('cell', { name: 'Customer - 50', exact: true })).toBeVisible()

    await expect(page.getByRole('cell', { name: 'Customer - 41', exact: true })).toBeVisible()
})

test('filter by price sorting "asc"', async ({ page }) => {
    await Orders(page)

    await page.locator('button').filter({ hasText: 'Classificar por preço' }).click()

    await page.getByLabel('Menor para o maior').click()

    await page.getByRole('button', { name: 'Filtrar resultados' }).click()

    await expect(page.getByRole('cell', { name: 'Customer - 1', exact: true })).toBeVisible()

    await expect(page.getByRole('cell', { name: 'Customer - 10', exact: true })).toBeVisible()
})

test('apply multiple filters together', async ({ page }) => {
    await Orders(page)

    await page.getByPlaceholder('ID do pedido').fill('order-4')

    await page.getByPlaceholder('Nome do cliente').fill('Customer - 47')

    await page.locator('button').filter({ hasText: 'Todos os status' }).click()
    await page.getByLabel('Em preparo').click()

    await page.locator('button').filter({ hasText: 'Classificar por preço' }).click()
    await page.getByLabel('Maior para o menor').click()

    await page.getByRole('button', { name: 'Filtrar resultados' }).click()

    await expect(page.getByRole('cell', { name: 'Customer - 47', exact: true })).toBeVisible()
})

test('clear filters', async ({ page }) => {
    await Orders(page)

    await page.getByPlaceholder('ID do pedido').fill('order-36')

    await page.getByRole('button', { name: 'Filtrar resultados' }).click()

    await expect(page.getByRole('cell', { name: 'Customer - 36', exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Remover filtros' }).click()

    await expect(page.getByRole('cell', { name: 'Customer - 1', exact: true })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Customer - 10', exact: true })).toBeVisible()
})