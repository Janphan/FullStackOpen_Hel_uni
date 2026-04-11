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
describe('Deleting a blog post', () => {

    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
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