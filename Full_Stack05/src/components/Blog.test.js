import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'testimies'
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const TitleDiv = blogComponent.find('.title')

    expect(TitleDiv.text()).toContain(blog.title)
  })
})