import { useState, useEffect } from 'react'
// Blog component not needed for table layout
import blogService from '../services/blogs'
import CreateNewBlogForm from '../forms/createNewBlogForm'
import LoginForm from '../forms/LoginForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage] = useState(null)
  const [isError] = useState(true)

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

  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  return (

    <div>
      <h2>Blog</h2>
      {errorMessage && (<div className={isError ? 'error' : 'success'}>{errorMessage}</div>)}
      {[...blogs].sort(compareLikes).map(blog => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
        // <Blog
        //   key={blog.id}
        //   blog={blog}
        //   handleLike={() => handleLike(blog)}
        //   handleRemove={() => handleRemove(blog)}
        //   currentUser={user}
        // />
      ))}
    </div>
  )
}

export default BlogList