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
describe('Checking missing likes property', () => {
    test('likes property defaults to 0 if missing', async () => {
        const newBlog = {
            title: "Blog without likes",
            author: "John Doe",
            url: "http://example.com/blog-without-likes"
        }
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.likes, 0, "Likes should default to 0 if missing in the request")
        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, listWithMultipleBlogs.length + 1, "Blog count should have increased by one")
    })
})

after(() => {
    mongoose.connection.close()
})