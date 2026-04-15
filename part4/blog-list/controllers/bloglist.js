const bloglistRouter = require('express').Router() // 
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

bloglistRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
            .find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

bloglistRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({ error: 'Invalid user ID' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

bloglistRouter.delete('/:id', async (request, response, next) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

        if (!deletedBlog) {
            return response.status(404).end()
        }

        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

bloglistRouter.put('/:id', async (request, response, next) => {
    const { title, author, url, likes } = request.body
    const updatedBlogData = { title, author, url, likes }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            updatedBlogData,
            { new: true, runValidators: true, context: 'query' }
        )

        if (!updatedBlog) {
            return response.status(404).end()
        }

        response.status(200).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = bloglistRouter //