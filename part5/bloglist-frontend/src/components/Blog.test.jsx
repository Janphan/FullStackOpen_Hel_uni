import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

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