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
describe('Checking missing title and url properties', () => {
    test('missing title and url results in 400 Bad Request', async () => {
        const newBlog = {
            author: "John Doe",
            likes: 7
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        //Check if the blog count has not increased
        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, listWithMultipleBlogs.length, "Blog count should not have increased")
    })
    test('missing title results in 400 Bad Request', async () => {
        const newBlog = {
            author: "John Doe",
            url: "http://example.com/new-blog-post",
            likes: 7
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        //Check if the blog count has not increased
        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, listWithMultipleBlogs.length, "Blog count should not have increased")
    })
    test('missing url results in 400 Bad Request', async () => {
        const newBlog = {
            title: "New Blog Post",
            author: "John Doe",
            likes: 7
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        //Check if the blog count has not increased 
        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, listWithMultipleBlogs.length, "Blog count should not have increased")
    })

})

after(() => {
    mongoose.connection.close()
})