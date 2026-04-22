const CreateNewBlogForm = ({
    handleSubmit,
    handleAuthorChange,
    handleTitleChange,
    handleUrlChange,
    handleLikesChange,
    title,
    author,
    url,
    likes }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url
                    <input
                        // type="url"
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    likes
                    <input
                        type="number"
                        value={likes}
                        onChange={handleLikesChange}
                        min="0"
                    />

                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateNewBlogForm