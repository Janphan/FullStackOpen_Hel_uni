const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {
    test('of empty list is null', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        assert.strictEqual(result, null)
    })
    test('when list has only one blog, returns that blog', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ]
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5
        })
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
            },
            {
                _id: "5a422a851b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
                likes: 5,
                __v: 0
            }
        ]
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        })
    })
    test('of a bigger list with multiple blogs with same likes is calculated right', () => {
        const blogs = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
            },
            {
                _id: "5a422a851b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
                likes: 7,
                __v: 0
            }
        ]
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        })
    })
})
