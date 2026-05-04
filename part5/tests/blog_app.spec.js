const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const openFormButton = page.getByRole('button', { name: 'login' })
        await openFormButton.click()
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByPlaceholder('username')).toBeVisible()
        await expect(page.getByPlaceholder('password')).toBeVisible()

        const loginSubmitButton = page.getByRole('button', { name: 'login' })
        await loginSubmitButton.click()
        await expect(loginSubmitButton).toBeVisible()
    })

})