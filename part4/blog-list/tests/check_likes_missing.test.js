const { describe, test, after, beforeEach } = require('node:test')
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
describe('Checking missing likes property', () => {
    test('likes property defaults to 0 if missing', async () => {
        const newBlog = {
            title: "Blog without likes",
            author: "John Doe",
            url: "http://example.com/blog-without-likes"
        }
        const response = await api
            .post('/api/blogs')
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