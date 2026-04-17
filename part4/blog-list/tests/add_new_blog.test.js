const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { listWithMultipleBlogs } = require('./blogs_fixtures')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let token = null
const api = supertest(app)
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    // Log in to get the token
    const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'password' })
    token = response.body.token

    for (let blog of listWithMultipleBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})
describe('Adding a new blog post', () => {

    test('add a new blog post', async () => {
        const newBlog = {
            title: "New Blog Post with token",
            author: "John Doe",
            url: "http://example.com/new-blog-post",
            likes: 7
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.title, newBlog.title, "Title should match the one sent in the request")
        assert.strictEqual(response.body.author, newBlog.author, "Author should match the one sent in the request")
        assert.strictEqual(response.body.url, newBlog.url, "URL should match the one sent in the request")
        assert.strictEqual(response.body.likes, newBlog.likes, "Likes should match the one sent in the request")
        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, listWithMultipleBlogs.length + 1, "Blog count should have increased by one")
    })

    test('fails with status code 400 if title and url are missing', async () => {
        const newBlog = {
            author: "John Doe",
            likes: 7
        }
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, listWithMultipleBlogs.length, "Blog count should not have increased")
    })
})

after(() => {
    mongoose.connection.close()
})
