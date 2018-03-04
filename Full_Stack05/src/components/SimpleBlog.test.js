import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'

describe.only('<SimpleBlog />', () => {
    let blog
    let sBlogComponent
    let click
    beforeEach(() => {
         blog = {
            title: 'testititteli',
            author: 'testiauthor',
            likes: 3
          }
        
        click = () => {console.log("pressed")}  
        sBlogComponent = shallow(<SimpleBlog blog={blog} onClick={click} />)
      })
    
  it('renders author', () => {
    const TitleDiv = sBlogComponent.find('.titleAuthor')
    expect(TitleDiv.text()).toContain(blog.author)
  })
  it('renders title', () => {
    const TitleDiv = sBlogComponent.find('.titleAuthor')
    expect(TitleDiv.text()).toContain(blog.title)
  })
  it('renders likes', () => {
    const LikeDiv = sBlogComponent.find('.likes')
    expect(LikeDiv.text()).toContain(blog.likes)
  })
  it('button clicks two times', () => {
      const mockHandler = jest.fn()
      sBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
      const button = sBlogComponent.find('button')
      button.simulate('click')
      button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})