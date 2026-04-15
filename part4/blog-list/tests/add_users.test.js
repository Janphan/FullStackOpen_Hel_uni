const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const User = require('../models/user')
const { listWithMultipleUsers } = require('./users_fixtures')

const api = supertest(app)
beforeEach(async () => {
    await User.deleteMany({})
    for (let user of listWithMultipleUsers) {
        let userObject = new User(user)
        await userObject.save()
    }
})

describe('User API', () => {

    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('creating a new user', async () => {
        const usersAtStart = await User.find({})
        const newUser = {
            username: "newuser",
            name: "New User",
            password: "password123"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1, "User count should have increased by one")
    })

    test('creating a user with short username fails', async () => {
        const usersAtStart = await User.find({})
        const newUser = {
            username: "ne",
            name: "New User",
            password: "password123"
        }
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtEnd.length, usersAtStart.length, "User count should not have increased")
        assert.strictEqual(response.body.error, 'Username must be at least 3 characters long', "Error message should indicate username length requirement")
        assert.strictEqual(response.status, 400, "Status code should be 400 for invalid username")
    })

    test('creating a user with duplicate username fails', async () => {
        const usersAtStart = await User.find({})
        const newUser = {
            username: "root",
            name: "New User",
            password: "password123"
        }
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtEnd.length, usersAtStart.length, "User count should not have increased")
        assert.strictEqual(response.body.error, 'expected `username` to be unique', "Error message should indicate username uniqueness requirement")
        assert.strictEqual(response.status, 400, "Status code should be 400 for duplicate username")
    })

    test('creating a user with short password fails', async () => {
        const usersAtStart = await User.find({})
        const newUser = {
            username: "newuser",
            name: "New User",
            password: "ha"
        }
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtEnd.length, usersAtStart.length, "User count should not have increased")
        assert.strictEqual(response.body.error, 'Password must be at least 3 characters long', "Error message should indicate password length requirement")
        assert.strictEqual(response.status, 400, "Status code should be 400 for invalid password")
    })
})


after(() => {
    mongoose.connection.close()
})