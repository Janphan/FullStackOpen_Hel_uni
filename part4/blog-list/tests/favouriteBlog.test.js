const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyBlogs, listWithOneBlog, listWithMultipleBlogs } = require('./blogs_fixtures')

describe('favourite blog', () => {
    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog(emptyBlogs)
        assert.strictEqual(result, null)
    })
    test('when list has only one blog, returns that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5
        })
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        assert.deepStrictEqual(result, {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        })
    })
    test('of a bigger list with multiple blogs with same likes is calculated right', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        assert.deepStrictEqual(result, {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        })
    })
})
