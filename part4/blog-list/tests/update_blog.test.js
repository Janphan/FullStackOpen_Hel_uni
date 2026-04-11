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

describe('Updating a blog post', () => {
    test('succeeds update likes with status code 200 if id is valid', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToUpdate = blogsAtStart[0]
        assert(blogToUpdate, 'A seeded blog should exist before update test runs')
        const updatedLikes = {
            ...blogToUpdate.toObject(),
            likes: blogToUpdate.likes + 10
        }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.likes, blogToUpdate.likes + 10, "Likes should have increased by 10")
    })
})

after(() => {
    mongoose.connection.close()
})
