import { useState, useEffect, useRef } from 'react'
import './App.css'
import blogService from './services/blogs'
import CreateNewBlogForm from './forms/createNewBlogForm'
import BlogList from './components/BlogList'
import LoginPage from './components/LoginPage'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import { AppBar, Toolbar, Button, Typography, Box, IconButton } from '@mui/material'

const padding = { paddingRight: 5 }

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(true)
  const blogFormRef = useRef()
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)
  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

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

  const handleCreateBlog = async (blogObject) => {
    try {
      if (blogFormRef && blogFormRef.current && typeof blogFormRef.current.toggleVisibility === 'function') {
        blogFormRef.current.toggleVisibility()
      }
      if (user && user.token) {
        blogService.setToken(user.token)
      }
      const createdBlog = await blogService.create(blogObject)
      const blogWithUser = {
        ...createdBlog,
        user
      }
      const successMessage = `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
      setBlogs(blogs.concat(blogWithUser))
      setNotification({ text: successMessage, type: 'success' })
      setIsError(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      navigate('/')
    } catch (exception) {
      const message = exception?.response?.data?.error || 'Error creating blog'
      setNotification({ text: message, type: 'error' })
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = async (blog) => {
    if (!user) {
      setNotification({ text: 'Please log in to like blogs', type: 'error' })
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      return
    }

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

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        navigate('/')
      } catch (exception) {
        const message = exception?.response?.data?.error || 'Error removing blog'
        setNotification({ text: message, type: 'error' })
        setIsError(true)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  return (
    <Container>

      <Box sx={{ flexGrow: 1 }}>
        < AppBar position="static" >

          <Toolbar>
            <Typography size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color="inherit" sx={style}><Link style={padding} to="/">blogs</Link></Button>
            <Button color="inherit" sx={style}><Link style={padding} to="/create">new blog</Link></Button>
            {user ? (
              <Button color="inherit" onClick={handleLogout} sx={style}>
                logout
              </Button>
            ) : (
              <Button color="inherit" sx={style}><Link style={padding} to="/login">login</Link></Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Notification notification={notification} />

      <Routes>
        <Route path="/" element={
          <BlogList
            blogs={blogs}
            user={user}
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
        {user && (
          <Route path="/create" element={
            <CreateNewBlogForm
              user={user}
              handleCreateBlog={handleCreateBlog}
              blogFormRef={blogFormRef}
            />
          } />
        )}
        <Route path="/blogs/:id" element={
          <Blog
            blogs={blogs}
            currentUser={user}
            handleLike={handleLike}
            handleRemove={handleRemove}

          />
        } />
      </Routes>
    </Container >
  )
}

export default App