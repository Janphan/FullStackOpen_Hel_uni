// Blog component not needed for table layout
import CreateNewBlogForm from '../forms/createNewBlogForm'
import LoginForm from '../forms/LoginForm'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  return (

    <div>
      <h2>Blogs</h2>
      {[...blogs].sort(compareLikes).map(blog => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </li>
      ))}
    </div>
  )
}

export default BlogList