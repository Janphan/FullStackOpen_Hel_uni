const bloglistRouter = require('express').Router() // 
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

bloglistRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

bloglistRouter.post('/', userExtractor, async (request, response, next) => {
    const body = request.body

    if (!request.user) {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }

    try {
        const user = await User.findById(request.user)

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

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

bloglistRouter.delete('/:id', userExtractor, async (request, response, next) => {
    try {
        if (!request.user) {
            return response.status(401).json({ error: 'Token missing or invalid' })
        }

        // Find the blog by ID
        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(404).json({ error: 'Blog not found' })
        }
        // Check if the blog has an associated user
        if (!blog.user) {
            return response.status(404).json({ error: 'Blog has no associated user' })
        }

        // Check if the user ID from the token matches the user ID associated with the blog
        if (blog.user.toString() === request.user) {
            // User is authorized to delete the blog
        } else {
            // User is not authorized to delete the blog
            return response.status(403).json({ error: 'Only the creator can delete this blog' })
        }

        // If the user is authorized, proceed to delete the blog
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

bloglistRouter.put('/:id', userExtractor, async (request, response, next) => {
    if (!request.user) {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }

    const { title, author, url, likes } = request.body
    const updatedBlogData = { title, author, url, likes }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            updatedBlogData,
            { new: true, runValidators: true, context: 'query' }
        )

        if (!updatedBlog) {
            return response.status(404).json({ error: 'Blog not found' })
        }
        response.status(200).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = bloglistRouter //