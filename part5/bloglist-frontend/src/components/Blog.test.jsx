import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Blog from './Blog'

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
