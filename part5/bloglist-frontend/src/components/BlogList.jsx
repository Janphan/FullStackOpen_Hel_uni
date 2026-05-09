// Blog component not needed for table layout
import CreateNewBlogForm from '../forms/createNewBlogForm'
import LoginForm from '../forms/LoginForm'
import Blog from './Blog'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const BlogList = ({ blogs }) => {
  function compareLikes(a, b) {
    return b.likes - a.likes
  }

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
          </TableRow>
        </TableHead>
        <TableBody>
          {[...blogs].sort(compareLikes).map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell>{blog.url}</TableCell>
              <TableCell>{blog.likes}</TableCell>
              <TableCell>{blog.user?.name || 'Unknown user'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList