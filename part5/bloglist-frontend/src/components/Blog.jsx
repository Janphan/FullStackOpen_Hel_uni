// import { useState } from 'react'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs, handleLike, handleRemove, currentUser }) => {
  // const [visible, setVisible] = useState(false)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if (!blog) return <div>Blog not found</div>

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const toggleVisibility = () => {
  //   setVisible(!visible)
  // }

  const showDeleteButton = blog.user?.username === currentUser?.username
  const showLikeButton = Boolean(currentUser)

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogHeader'>
        {blog.title} by {blog.author}
        {/* <button className='viewButton' onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button> */}
      </div>
      <div className='blogContent'>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes} {showLikeButton && (
            <button className='likeButton' onClick={() => handleLike?.(blog)} title='Like blog'>
              like
            </button>
          )}
        </div>
        <div>Added by {blog.user?.name || 'Unknown user'}</div>
        {showDeleteButton && (
          <button className='removeButton' name='remove' onClick={() => handleRemove?.(blog)}>
            remove
          </button>
        )}
      </div>

    </div>
  )
}

export default Blog