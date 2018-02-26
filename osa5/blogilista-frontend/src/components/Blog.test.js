import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import Togglable from './Togglable'

describe('<Note />', () => {
  let blog
  let togglableComponent

  beforeEach(() => {
    blog = {
      title: 'Hieno testiblogi',
      author: 'Vilima',
      url: 'http://testi.com',
      likes: 6
    }
    const mockDeleteHandler = jest.fn()
    const mockLikeHandler = jest.fn()

    togglableComponent = shallow(
      <Togglable buttonLabel={`${blog.title} by ${blog.author}`}>
        <div>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{blog.likes} likes <button onClick={mockLikeHandler}>like</button></p>
          <p>blog has no adder</p>
          <p><button onClick={mockDeleteHandler}>delete</button></p>
        </div>
      </Togglable>
    )
  })

  it('renders only title and author by default', () => {
    const togglableContent = togglableComponent.find('.togglableContent')

    expect(togglableContent.getElement().props.style).toEqual({ display: 'none' })
  })

  it('renders blog info only after clicking the title', () => {
    const button = togglableComponent.find('button')
    button.at(0).simulate('click')

    const togglableContent = togglableComponent.find('.togglableContent')

    expect(togglableContent.getElement().props.style).toEqual({ display: '' })
  })
})