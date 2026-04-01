const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    const favorite = blogs.reduce((prev, current) => (prev.likes >= current.likes) ? prev : current)
    const { title, author, url, likes } = favorite
    return { title, author, url, likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    const counts = _.countBy(blogs, 'author')
    console.log("result", counts)
    const pairs = _.toPairs(counts)
    const topPair = _.maxBy(pairs, pair => pair[1])
    return { author: topPair[0], blogs: topPair[1] }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    return _.chain(blogs)
        .groupBy('author')
        .map((group, author) => ({ author, likes: _.sumBy(group, 'likes') }))
        .maxBy('likes')
        .value()
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}