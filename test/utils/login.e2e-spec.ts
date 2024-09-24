import { expect, Page} from '@playwright/test';

export async function Login(page: Page) {
    await page.goto('/sign-in', { waitUntil: 'networkidle' });

    await page.getByLabel('Seu email').fill('johndoe@example.com')

    await page.getByRole('button', { name: 'Acessar painel' }).click()

    const toast = page.getByText('Enviamos um link de autenticação para o seu e-mail!')

    await expect(toast).toBeVisible()
};