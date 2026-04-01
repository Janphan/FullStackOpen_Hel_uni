const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    test('of empty list is null', () => {
        const blogs = []
        const result = listHelper.mostBlogs(blogs)
        assert.strictEqual(result, null)
    })
    test('when list has only one blog, returns that author with 1 blog', () => {
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
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
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
            },
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            },
            {
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
                __v: 0
            }]
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
    })
    test('of a bigger list with multiple authors with same blogs is calculated right', () => {
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
            },
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            },
            {
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 10,
                __v: 0
            },
            {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
                __v: 0
            },
        ]
        const result = listHelper.mostBlogs(blogs)
        assert.strictEqual(result.blogs, 2)
        assert.ok(result.author === 'Edsger W. Dijkstra' || result.author === 'Robert C. Martin')

    })
})