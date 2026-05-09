import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const CreateNewBlogForm = ({
  handleCreateBlog
}) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = async (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url, likes })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
    navigate('/')
  }
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div style={{ marginBottom: 10 }}>
          <TextField
            label="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title"
            fullWidth
            sx={{ maxWidth: 520 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <TextField
            label="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Author"
            fullWidth
            sx={{ maxWidth: 520 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <TextField
            label="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            fullWidth
            sx={{ maxWidth: 520 }}
            placeholder="Url"
          />
        </div>
        {/* <div>
          <TextField
            label="Likes"
            value={likes}
            onChange={({ target }) => setLikes(Number(target.value))}
            min="0"
          />
        </div> */}
        <Button type="submit" name="create" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form >
    </div >
  )
}

export default CreateNewBlogForm