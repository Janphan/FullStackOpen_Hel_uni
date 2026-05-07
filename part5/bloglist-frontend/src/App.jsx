import { useState, useEffect, useRef } from 'react'
import './App.css'
import blogService from './services/blogs'
import CreateNewBlogForm from './forms/createNewBlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import LoginPage from './components/LoginPage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const padding = { paddingRight: 5 }

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(true)
  const blogFormRef = useRef()

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

  //Create new blogs into its own component
  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      const blogWithUser = {
        ...createdBlog,
        user
      }
      const successMessage = `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
      setBlogs(blogs.concat(blogWithUser))
      setErrorMessage(successMessage)
      setIsError(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      const message = exception?.response?.data?.error || 'Error creating blog'
      setErrorMessage(message)
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {user === null ? (
          <Link style={padding} to="/login">login</Link>
        ) : (
          <>
            <button style={padding} onClick={handleLogout} name="logout">logout</button>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={
          <BlogList
            blogs={blogs}
            user={user}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        } />
        <Route path="/login" element={
          <LoginPage
            user={user}
            setUser={setUser}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            isError={isError}
            setIsError={setIsError}
          />
        } />
      </Routes>

    </Router>

  )
}

export default App