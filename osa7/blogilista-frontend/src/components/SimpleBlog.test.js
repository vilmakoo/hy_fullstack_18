import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<Blog />', () => {
  const blog = {
    title: 'Blogin otsikko',
    author: 'Testikäyttäjä',
    likes: 3
  }
  const blogComponent = shallow(<SimpleBlog blog={blog} />)

  it('renders title', () => {
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    expect(titleAndAuthorDiv.text()).toContain(blog.title)
  })

  it('renders author', () => {
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    expect(titleAndAuthorDiv.text()).toContain(blog.author)
  })

  it('renders like count', () => {
    const likesDiv = blogComponent.find('.likes')
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('event handler function is called twice when clicking the like-button twice', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})