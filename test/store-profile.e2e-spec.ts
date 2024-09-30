import { expect, test } from '@playwright/test';
import { Login } from './utils/login.e2e-spec';

test('update profile successfully', async ({ page }) => {
    await Login(page)

    await page.goto('/', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'MAJOSI' }).click()

    await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

    await page.getByLabel('Nome').fill('Pizza Shop')

    await page.getByRole('button', { name: 'Salvar' }).click()

    await page.waitForLoadState('networkidle')

    const toast = page.getByText('Perfil atualizado com sucesso!')

    await expect(toast).toBeVisible()

    await page.getByRole('button', { name: 'Close' }).click()

    await expect(page.getByRole('button', { name: 'Pizza Shop' })).toBeVisible()
});


test('fail to update profile', async ({ page }) => {
    await Login(page)

    await page.goto('/', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'MAJOSI' }).click()

    await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

    await page.getByLabel('Nome').fill('Custom name')

    await page.getByRole('button', { name: 'Salvar' }).click()

    await page.waitForLoadState('networkidle')

    const toast = page.getByText('Falha ao atualizar o perfil, tente novamente.')

    await expect(toast).toBeVisible()

    await page.getByRole('button', { name: 'Close' }).click()

    await expect(page.getByRole('button', { name: 'MAJOSI' })).toBeVisible()
});