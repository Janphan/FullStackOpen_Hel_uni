const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app with navigation', () => {
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
    test('Login succeeds with the correct username/password combination', async ({ page }) => {
        await loginWith(page, 'root', 'secret')
        await expect(page.getByRole('button', {
            name: 'logout'
        })).toBeVisible()
    })
    test('Login fails if the username/password is incorrect', async ({ page }) => {

        await loginWith(page, 'root', 'wrong')
        await expect(page.getByText('invalid username or password')).toBeVisible()
    })

    test('A logged-in user can create a blog', async ({ page }) => {
        const newBlog = {
            title: 'test',
            author: 'tester',
            url: 'http://test.com',
            likes: 145
        }
        await loginWith(page, 'root', 'secret')
        await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
        await expect(page.getByText(`${newBlog.title} by ${newBlog.author}`)).toBeVisible()
    })
    test('A logged-in user can like blogs', async ({ page }) => {
        const newBlog = {
            title: 'test',
            author: 'tester',
            url: 'http://test.com',
            likes: 145
        }
        await loginWith(page, 'root', 'secret')
        await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
        const blogLink = page.getByRole('link', { name: `${newBlog.title} by ${newBlog.author}` })
        await blogLink.click()

        const likeButton = page.getByRole('button', { name: 'like' })
        await likeButton.click()
        await expect(page.getByText(`likes ${newBlog.likes + 1}`)).toBeVisible()
    })
    test('A logged-in user can delete a blog they created', async ({ page }) => {
        const newBlog = {
            title: 'test',
            author: 'tester',
            url: 'http://test.com',
            likes: 145
        }
        //login and create a blog
        await loginWith(page, 'root', 'secret')
        await createBlog(page, newBlog.title, newBlog.author, newBlog.url, newBlog.likes)
        //click the blog to view details and click remove
        const blogLink = page.getByRole('link', { name: `${newBlog.title} by ${newBlog.author}` })
        await blogLink.click()
        page.once('dialog', async dialog => await dialog.accept())

        const removeButton = page.getByRole('button', { name: 'remove' })
        await removeButton.click()

        // check that the blog is no longer visible
        await expect(page.getByRole('link', { name: `${newBlog.title} by ${newBlog.author}` })).not.toBeVisible()
    })
})
