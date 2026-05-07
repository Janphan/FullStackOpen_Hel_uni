const loginWith = async (page, username, password) => {
    //open the login form
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)

    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url, likes) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByLabel('likes').fill(String(likes))
    await page.getByRole('button', { name: 'create' }).click()
    // wait until the new blog appears in the list to avoid race conditions
    await page.locator('.blog').filter({ hasText: `${title} by ${author}` }).waitFor({ state: 'visible' })
}


export { loginWith, createBlog }