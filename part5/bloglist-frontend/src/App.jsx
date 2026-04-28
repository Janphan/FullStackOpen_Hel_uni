import { useState, useEffect, useRef } from 'react'
import './App.css'
// Blog component not needed for table layout
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlogForm from './forms/createNewBlogForm'
import LoginForm from './forms/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = exception?.response?.data?.error || 'Wrong username or password'
      setErrorMessage(message)
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  //Create new blogs into its own component
  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      const successMessage = `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
      setBlogs(blogs.concat(createdBlog))
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
    try {
      const updatedBlog = await blogService.update(blog.id, { ...blog, likes: (blog.likes || 0) + 1 })
      setBlogs(prev => prev.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    } catch (exception) {
      const message = exception?.response?.data?.error || 'Error liking blog'
      setErrorMessage(message)
      setIsError(true)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }


  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateNewBlogForm
          createBlog={handleCreateBlog}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && (<div className={isError ? "error" : "success"}>{errorMessage}</div>)}

      {user === null ? loginForm() :
        (<div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {createBlogForm()}
          <div>
            {blogs.map(blog => (
              <div key={blog.id} className="blog-line" style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <div>
                  <strong>{blog.title}</strong>
                </div>
                <div>
                  <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
                </div>
                <div style={{ marginTop: '6px' }}>
                  {blog.likes || 0} <button onClick={() => handleLike(blog)}>like</button>
                </div>
                <div>
                  {blog.author}
                </div>
              </div>
            ))}
          </div>
        </div>)
      }
    </div >
  )
}

export default App