const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { listWithOneBlog, listWithMultipleBlogs } = require('./blogs_fixtures')

const api = supertest(app)
beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of listWithMultipleBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    assert.strictEqual(blogs.length > 0, true, "Database should contain at least one blog")
    const blogToTest = blogs[0]

    assert.ok(blogToTest.id, "Blog post should have an 'id' property")
    assert.strictEqual(blogToTest._id, undefined, "Blog post should not have an '_id' property")
    assert.strictEqual(blogToTest.__v, undefined, "Blog post should not have a '__v' property")
})

after(() => {
    mongoose.connection.close()
})