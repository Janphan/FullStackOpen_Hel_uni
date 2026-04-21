import { useState } from 'react'

const CreateNewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)
    const createBlogForm = () => (
        <form onSubmit={(e) => {
            e.preventDefault()
            createBlog({ title, author, url, likes })
            setTitle('')
            setAuthor('')
            setUrl('')
            setLikes(0)
        }}>
            <div>
                <h2>Create new blog</h2>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Author
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Url
                    <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Likes
                    <input
                        type="number"
                        value={likes}
                        onChange={({ target }) => setLikes(target.value)}
                    />
                </label>
            </div>
            <button type="submit">create</button>
        </form>
    )

    return createBlogForm()
}

export default CreateNewBlogForm