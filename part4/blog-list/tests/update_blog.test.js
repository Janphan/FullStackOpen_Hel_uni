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
            .set('Authorization', `Bearer ${token}`)
            .send(updatedLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.likes, blogToUpdate.likes + 10, "Likes should have increased by 10")
    })
})

after(() => {
    mongoose.connection.close()
})
