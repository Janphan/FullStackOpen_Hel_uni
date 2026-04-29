import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showDeleteButton = blog.user?.username === currentUser?.username
  return (
    < div style={blogStyle} >
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>

      {visible && (
        <div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>Likes {blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user?.name || 'Unknown user'}</div>
          {showDeleteButton && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div >
  )
}
export default Blog