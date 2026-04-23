import { useState, useEffect } from 'react'
import './App.css'
// Blog component not needed for table layout
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlogForm from './forms/createNewBlogForm'
import LoginForm from './forms/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(true)
  const [loginVisible, setLoginVisible] = useState(false)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)


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
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create({ title, author, url, likes })
      const successMessage = `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage(successMessage)
      setIsError(false)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes(0)
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


  const loginForm = (props) => {
    const hideWhenVisible = { display: props.visible ? 'none' : '' }
    const showWhenVisible = { display: props.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const createBlogForm = (props) => {
    const hideWhenVisible = { display: props.visible ? 'none' : '' }
    const showWhenVisible = { display: props.visible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateNewBlogForm
            title={title}
            author={author}
            url={url}
            likes={likes}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleLikesChange={({ target }) => setLikes(target.value)}
            handleSubmit={handleCreateBlog}
          />
          <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // if (user === null) {
  //   return (
  //     <div>
  //       {errorMessage && (<div className={isError ? "error" : "success"}>{errorMessage}</div>)}
  //       {loginForm({ visible: loginVisible })}
  //     </div>
  //   )
  // }

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && (<div className={isError ? "error" : "success"}>{errorMessage}</div>)}

      {user === null ? loginForm({ visible: loginVisible }) :
        (<div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {createBlogForm({ visible: createBlogVisible })}
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Likes</th>
                <th>Url</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>{blog.likes}</td>
                  <td>{blog.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)
      }
    </div >
  )
}

export default App