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
        await page.evaluate(() => window.localStorage.clear())
        await page.reload()
    })

    describe('when unauthenticated', () => {
        test('Blog information and the number of likes are displayed, buttons are not displayed', async ({ page }) => {
            const newBlog = {
                title: 'Test',
                author: 'test',
                url: 'test.com',
                likes: 12
            }
            //create a blog with logged in user
            await loginWith(page, 'root', 'secret')
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
            // wait for blog link to appear in the list
            await page.getByRole('link', { name: `${newBlog.title} by ${newBlog.author}` }).waitFor({ state: 'visible' })
            await page.getByRole('button', { name: 'logout' }).click()
            // wait for login link to appear, indicating logout was successful
            await page.getByRole('link', { name: 'login' }).waitFor({ state: 'visible' })
            //check if the blog is visible and click it
            await page.getByRole('link', { name: `${newBlog.title} by ${newBlog.author}` }).click()
            //blog information should be displayed
            await expect(page.getByText(`${newBlog.title} by ${newBlog.author}`)).toBeVisible()
            await expect(page.getByText(`likes ${newBlog.likes}`)).toBeVisible()
            //buttons are not displayed
            await expect(page.getByRole('button', { name: 'like' })).not.toBeVisible()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })
    describe('when authenticated', () => {
        beforeEach(async ({ page, request }) => {
            await request.post('http://localhost:3001/api/users', {
                data: {
                    name: 'User1',
                    username: 'user1',
                    password: 'secret'
                }
            })
            await request.post('http://localhost:3001/api/users', {
                data: {
                    name: 'User2',
                    username: 'user2',
                    password: 'secret'
                }
            })
        })
        test('Authenticated users who are not the blog’s creator are shown only the like button', async ({ page }) => {
            const newBlog = {
                title: 'Test',
                author: 'test',
                url: 'test.com',
                likes: 12
            }
            //create a blog with logged in user
            //user1 creates a blog
            await loginWith(page, 'user1', 'secret')
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
            await page.getByRole('link', { name: `${newBlog.title} by ${newBlog.author}` }).waitFor({ state: 'visible' })
            await page.getByRole('button', { name: 'logout' }).click()
            // wait for login link to appear, indicating logout was successful
            await page.getByRole('link', { name: 'login' }).waitFor({ state: 'visible' })
            //user2 logs in and clicks the blog
            await loginWith(page, 'user2', 'secret')
            await page.getByRole('link', { name: `${newBlog.title} by ${newBlog.author}` }).click()
            //like button should be visible, remove button should not be visible
            await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })


})