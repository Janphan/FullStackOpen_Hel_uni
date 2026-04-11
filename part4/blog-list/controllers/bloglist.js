const bloglistRouter = require('express').Router() // 
const Blog = require('../models/blog') // 

bloglistRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

bloglistRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    try {
        const savedBlog = await blog.save()
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

module.exports = bloglistRouter //