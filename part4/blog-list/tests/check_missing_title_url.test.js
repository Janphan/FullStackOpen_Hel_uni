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
describe('Checking missing title and url properties', () => {
    test('missing title and url results in 400 Bad Request', async () => {
        const newBlog = {
            author: "John Doe",
            likes: 7
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
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