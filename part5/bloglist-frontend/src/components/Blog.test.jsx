import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'
import CreateNewBlogForm from '../forms/createNewBlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'http://testurl.com',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(div).toHaveTextContent('Matti Luukkainen')

  const urlElement = screen.queryByText('http://testurl.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('Likes 0')
  expect(likesElement).toBeNull()

})

test('clicking the view button shows url and number of likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'http://testurl.com',
    likes: 35
  }

  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const urlElement = screen.getByText('http://testurl.com')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('Likes 35')
  expect(likesElement).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'http://testurl.com',
    likes: 35
  }

  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<CreateNewBlogForm/> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateNewBlogForm createBlog={createBlog} />)
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'http://testurl.com',
    likes: 0
  }
  // const createNewBlog = screen.getByText('create new blog')
  // await user.click(createNewBlog)

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const likesInput = screen.getByPlaceholderText('likes')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.type(likesInput, blog.likes.toString())
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(blog)
})
