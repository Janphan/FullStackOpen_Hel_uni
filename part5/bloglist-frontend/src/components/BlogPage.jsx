import { useParams } from 'react-router-dom'
import Blog from './Blog'

const BlogPage = ({ blogs = [], handleLike, handleRemove, currentUser }) => {
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <Blog
      blog={blog}
      handleLike={handleLike}
      handleRemove={handleRemove}
      currentUser={currentUser}
    />
  )
}

export default BlogPage
