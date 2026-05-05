import { useState } from 'react'
const CreateNewBlogForm = ({
  createBlog,

}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({ title, author, url, likes })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="title"
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="author"
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              // type="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder="url"
            />
          </label>
        </div>
        <div>
          <label>
            likes
            <input
              // type="number"
              value={likes}
              onChange={({ target }) => setLikes(Number(target.value))}
              min="0"
              placeholder="likes"
            />
          </label>
        </div>
        <div>
        </div>
        <button type="submit" id="create-blog-button" name="create">
          create
        </button>
      </form>
    </div>
  )
}

export default CreateNewBlogForm