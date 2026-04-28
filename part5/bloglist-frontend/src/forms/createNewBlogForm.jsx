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
                    title
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        // type="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <div>
                    likes
                    <input
                        type="number"
                        value={likes}
                        onChange={({ target }) => setLikes(Number(target.value))}
                        min="0"
                    />

                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateNewBlogForm