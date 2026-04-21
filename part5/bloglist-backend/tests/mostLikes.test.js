const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithMultipleBlogs } = require('./blogs_fixtures')

describe('most likes', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostLikes([])
        assert.strictEqual(result, null)
    })

    test('when list has only one blog, returns that author with likes of that blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 19 })
    })

    test('of a bigger list with multiple authors with same likes is calculated right', () => {
        const tieBlogs = listWithMultipleBlogs.concat({
            author: "Michael Chan",
            likes: 12 //Already has 7, so total will be 19, same as Dijkstra
        })
        const result = listHelper.mostLikes(tieBlogs)
        const winners = ['Edsger W. Dijkstra', 'Michael Chan']
        assert.ok(winners.includes(result.author), `Expected one of ${winners} but got ${result.author}`)
        assert.strictEqual(result.likes, 19)
    })
})
