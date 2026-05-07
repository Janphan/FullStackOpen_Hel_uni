import { useState, useEffect } from 'react'
// Blog component not needed for table layout
import blogService from '../services/blogs'
import CreateNewBlogForm from '../forms/createNewBlogForm'
import LoginForm from '../forms/LoginForm'
import Togglable from './Togglable'
import Blog from './Blog'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLike = async (blog) => {
    console.log('Liking blog:', blog)
    console.log('type of blog user', typeof blog.user)

    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user || null
    }

    const updateBlog = await blogService.update(blog.id, blogToUpdate)
    setBlogs(blogs.map(b => b.id === blog.id ? updateBlog : b))
  }


  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (exception) {
        const message = exception?.response?.data?.error || 'Error removing blog'
        setErrorMessage(message)
        setIsError(true)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (

    <div>
      <h2>Blog</h2>
      {errorMessage && (<div className={isError ? 'error' : 'success'}>{errorMessage}</div>)}
      {[...blogs].sort(compareLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
          currentUser={user}
        />
      ))}
    </div>
  )
}

export default BlogList