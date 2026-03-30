const bloglistRouter = require('express').Router() // 
const Blog = require('../models/blog') // 

bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

bloglistRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error) // Chuyển lỗi sang middleware xử lý lỗi 
    }
})

module.exports = bloglistRouter //