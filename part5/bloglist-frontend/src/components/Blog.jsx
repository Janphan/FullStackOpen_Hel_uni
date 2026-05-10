// import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Blog = ({ blogs, currentUser, handleLike, handleRemove }) => {
  // const [visible, setVisible] = useState(false)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if (!blog) return <div>Blog not found</div>

  const showDeleteButton = blog.user?.username === currentUser?.username
  const showLikeButton = Boolean(currentUser)

  return (
    <TableContainer component={Paper}>

      <Card sx={{ minWidth: 275, margin: '1rem' }}>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {blog.author}
            </Typography>
            <Link variant="body2" color="text.secondary" href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </Link>
            <Typography variant="body2" color="text.secondary">
              Added by: {blog.user?.name || 'Unknown user'}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {blog.likes} Likes
            </Typography>
            {showLikeButton && (
              <Button variant="outlined" className='likeButton' onClick={() => handleLike?.(blog)} title='Like blog' style={{ color: 'blue', cursor: 'pointer' }}>
                like
              </Button>
            )}
            {showDeleteButton && (
              <Button variant="outlined" className='removeButton' name='remove' onClick={() => handleRemove?.(blog)} style={{ color: 'red' }} title='Remove blog'>
                remove
              </Button>
            )}
          </Stack>
        </CardActions>
      </Card>
    </TableContainer>
  )
}

export default Blog