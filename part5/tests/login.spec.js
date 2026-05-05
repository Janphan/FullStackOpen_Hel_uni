const { test, expect, describe, beforeEach } = require('@playwright/test')
import { loginWith } from './helper'

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        //empty the database
        await page.request.post('http://localhost:3001/api/testing/reset')

        //create a user to test with
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Root',
                username: 'root',
                password: 'secret'
            }
        })
        //go to the app
        await page.goto('http://localhost:5173')
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'root', 'secret')
            await expect(page.getByText('root logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'root', 'wrong')
            await expect(page.getByText('Invalid username or password')).toBeVisible()
        })

        test('when logged in, user shows up on the page', async ({ page }) => {
            await loginWith(page, 'root', 'secret')
            await expect(page.getByText('root logged in')).toBeVisible()
        })
    })
})