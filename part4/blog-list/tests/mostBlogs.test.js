const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithMultipleBlogs } = require('./blogs_fixtures')

describe('most blogs', () => {
    test('of empty list is null', () => {
        const blogs = []
        const result = listHelper.mostBlogs(blogs)
        assert.strictEqual(result, null)
    })
    test('when list has only one blog, returns that author with 1 blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 3 })
    })
    test('of a bigger list with multiple authors with same blogs is calculated right', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        assert.strictEqual(result.blogs, 3)
        assert.ok(result.author === 'Robert C. Martin' || result.author === 'Edsger W. Dijkstra')

    })
})