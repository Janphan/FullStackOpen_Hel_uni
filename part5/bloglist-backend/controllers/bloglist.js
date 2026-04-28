const bloglistRouter = require('express').Router() // 
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

//Get all blogs with user details
bloglistRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})
// Create a new blog
bloglistRouter.post('/', userExtractor, async (request, response, next) => {
    const blog = new Blog(request.body)
    const user = request.user

    blog.likes = blog.likes || 0
    blog.user = user._id

    if (!blog.title || !blog.url) {
        return response.status(400).json({ error: 'Title and URL are required' })
    }
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})
// Delete a blog by ID (only if the authenticated user is the owner)
bloglistRouter.delete('/:id', userExtractor, async (request, response, next) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(204).json({ error: 'Blog not found' })
    }
    if (user.id.toString() !== blog.user.toString()) {
        return response.status(403).json({ error: 'Forbidden: You can only delete your own blogs' })
    }

    user.blogs = user.blogs.filter(blogId => blogId.toString() !== blog.id.toString())
    await user.save()
    await blog.deleteOne()
    response.status(204).end()
})
// Update blog details (title, author, url, likes)
bloglistRouter.put('/:id', userExtractor, async (request, response, next) => {
    const { title, author, url, likes } = request.body
    const updateBlog = await Blog.findByIdAndUpdate(
        request.params.id, { title, author, url, likes },
        { new: true, runValidators: true, context: 'query' })
        .populate('user', { username: 1, name: 1 })
    if (!updateBlog) {
        return response.status(404).json({ error: 'Blog not found' })
    }

    response.json(updateBlog)
})

module.exports = bloglistRouter //