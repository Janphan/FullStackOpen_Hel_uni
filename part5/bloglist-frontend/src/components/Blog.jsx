// import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const Blog = ({ blogs, currentUser, handleLike, handleRemove }) => {
  // const [visible, setVisible] = useState(false)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if (!blog) return <div>Blog not found</div>

  const showDeleteButton = blog.user?.username === currentUser?.username
  const showLikeButton = Boolean(currentUser)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Url</TableCell>
            <TableCell>Likes</TableCell>
            <TableCell>Added by</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{blog.title}</TableCell>
            <TableCell>{blog.author}</TableCell>
            <TableCell>{blog.url}</TableCell>
            <TableCell>Likes {blog.likes} {showLikeButton && (
              <button className='likeButton' onClick={() => handleLike?.(blog)} title='Like blog'>
                like
              </button>
            )}</TableCell>
            <TableCell>
              Added by {blog.user?.name || 'Unknown user'}</TableCell>
            <TableCell>
              {showDeleteButton && (
                <button className='removeButton' name='remove' onClick={() => handleRemove?.(blog)}>
                  remove
                </button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Blog