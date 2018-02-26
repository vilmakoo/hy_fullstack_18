import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders only login form and no blogs', () => {
      app.update()

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)

      const loginForm = app.find('form')
      expect(loginForm.text()).toContain('username:')
      expect(loginForm.text()).toContain('password:')
      expect(loginForm.html()).toContain('<button type="submit">')
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1232123421',
        name: 'Testi Käyttäjä'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('renders all blogs', () => {
      app.update()

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})