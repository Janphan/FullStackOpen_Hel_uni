const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { listWithMultipleBlogs } = require('./blogs_fixtures')

const api = supertest(app)
beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of listWithMultipleBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})
describe('Adding a new blog post', () => {

    test('add a new blog post', async () => {
        const newBlog = {
            title: "New Blog Post",
            author: "John Doe",
            url: "http://example.com/new-blog-post",
            likes: 7
        }
        const response = await api
            .post('/api/blogs')
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
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, listWithMultipleBlogs.length, "Blog count should not have increased")
    })
})

after(() => {
    mongoose.connection.close()
})
