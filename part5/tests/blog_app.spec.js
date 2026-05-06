const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'root', 'secret')
        })
        test('user can create a blog', async ({ page }) => {
            const newBlog = {
                title: 'test',
                author: 'tester',
                url: 'http://test.com',
                likes: 145
            }
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
            await expect(page.getByText(`${newBlog.title} by ${newBlog.author}`)).toBeVisible()
        })

        test('user can like a blog', async ({ page }) => {
            const newBlog = {
                title: 'test',
                author: 'tester',
                url: 'http://test.com',
                likes: 145
            }
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
            const viewButton = page.getByRole('button', { name: 'view' })
            await viewButton.click()
            const likeButton = page.getByRole('button', { name: 'like' })
            await likeButton.click()
            await expect(page.getByText(`likes ${newBlog.likes + 1}`)).toBeVisible()
        })
        test('user can remove a blog', async ({ page }) => {
            const newBlog = {
                title: 'test',
                author: 'tester',
                url: 'http://test.com',
                likes: 145
            }

            //create a blog to remove
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
            //remove the blog
            const viewButton = page.getByRole('button', { name: 'view' })
            await viewButton.click()
            page.on('dialog', async dialog => await dialog.accept())
            const removeButton = page.getByRole('button', { name: 'remove' })
            await removeButton.click()
            await expect(page.getByText(`${newBlog.title} by ${newBlog.author}`)).not.toBeVisible()
        })
        test('only the owner can see the remove button', async ({ page, request }) => {
            const newBlog = {
                title: 'test',
                author: 'tester',
                url: 'http://test.com',
                likes: 145
            }
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
            //create another user
            await request.post('http://localhost:3001/api/users', {
                data: {
                    name: 'Tester',
                    username: 'tester',
                    password: 'secret'
                }
            })
            //logout and login with the new user
            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'tester', 'secret')

            const blogContainer = page.locator('.blog').filter({ hasText: `${newBlog.title} by ${newBlog.author}` })

            await blogContainer.getByRole('button', { name: 'view' }).click()
            await viewButton.click()
            const removeButton = page.getByRole('button', { name: 'remove' })
            await expect(removeButton).not.toBeVisible()
        })
    })
})