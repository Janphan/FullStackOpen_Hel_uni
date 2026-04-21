const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { listWithMultipleBlogs } = require('./blogs_fixtures')

let token = null
const api = supertest(app)
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'password' })
    token = response.body.token

    for (let blog of listWithMultipleBlogs) {
        let blogObject = new Blog({ ...blog, user: user._id })
        await blogObject.save()
        user.blogs = user.blogs.concat(blogObject._id)
    }

    await user.save()
})
describe('Deleting a blog post', () => {

    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await Blog.find({})
        const ids = blogsAtEnd.map(b => b.id)
        const titles = blogsAtEnd.map(b => b.title)

        assert(!ids.includes(blogToDelete.id), "Deleted blog ID should not be in the remaining blogs")
        assert(!titles.includes(blogToDelete.title), "Deleted blog title should not be in the remaining blogs")
    })
})

after(() => {
    mongoose.connection.close()
})  