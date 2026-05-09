const loginWith = async (page, username, password) => {
    //open the login form
    await page.getByRole('link', { name: 'login' }).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
    // wait for logout button to appear (if login successful) or error message to appear
    try {
        await page.getByRole('button', { name: 'logout' }).waitFor({ state: 'visible', timeout: 5000 })
    } catch (e) {
        // Login may have failed, error message should be displayed
    }
}

const createBlog = async (page, title, author, url, likes) => {
    await page.getByRole('link', { name: 'new blog' }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByLabel('likes').fill(String(likes))
    await page.getByRole('button', { name: 'create' }).click()
    // wait until the new blog appears in the list to avoid race conditions
    await page.getByRole('link', { name: `${title} by ${author}` }).waitFor({ state: 'visible' })
}

export { loginWith, createBlog }