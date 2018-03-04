import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe('<App />', () => {
  let app
  let user
  beforeAll(() => {
    app = mount(<App />)
    user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
  })

  it('renders no blogs without log in', () => {
    app.update()
    const blogComponents = app.find(Blog)
    expect(!blogComponents)
  })
  it('renders blogs when logged in', () => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    app.update()

    const blogComponents = app.find(Blog)
    expect(blogComponents)
  })
})