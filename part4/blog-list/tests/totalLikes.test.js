const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyBlogs, listWithOneBlog, listWithMultipleBlogs } = require('./blogs_fixtures')

describe('total likes', () => {
    test('when list is empty, equals zero', () => {
        const result = listHelper.totalLikes(emptyBlogs)
        assert.strictEqual(result, 0)
    })
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
    test('when list has multiple blogs, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        assert.strictEqual(result, 43)
    })
})
test('when list has multiple blogs, equals the likes of that', () => {

    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 43)
})