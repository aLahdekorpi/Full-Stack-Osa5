import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: {
        title: '',
        author: ''
      },
      showAll: true,
      error: null,
      username: '',
      password: '',
      visibleBlogs: false,
      user: null,
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }
   

  login = async (event) => {

    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)



      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title : this.state.newBlog.title,
      author: this.state.newBlog.author
    }
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog:{
            author: '',
            title: ''
          } 
        })
      })
  }

  handleBlogTitleChange = (event) => {
    const blogObject = {
      title : event.target.value,
      author: this.state.newBlog.author
    }
    console.log(blogObject.title)

      this.setState({ newBlog: blogObject})
  }
  handleBlogAuthorChange = (event) => {
    const blogObject = {
      title : this.state.newBlog.title,
      author: event.target.value
    }
    console.log(blogObject)
    this.setState({ newBlog: blogObject})
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }
  
   

  render() {


   

  const loginForm = () => {
  const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
  const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
        <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
      </div>
    </div>
  )
}




      const blogForm = () => {
        const hideWhenVisible = { display: this.state.blogVisible ? 'none' : '' }
        const showWhenVisible = { display: this.state.blogVisible ? '' : 'none' }
      
        return (
          <div>
            <div style={hideWhenVisible}>
              <button onClick={e => this.setState({ blogVisible: true })}>new blog</button>
            </div>
            <div style={showWhenVisible}>
              <BlogForm
                visible={this.state.visible}
                title={this.state.newBlog.title}
                author={this.state.newBlog.author}
                handleTitleChange={this.handleBlogTitleChange}
                handleAuthorChange={this.handleBlogAuthorChange}
                handleSubmit={this.addBlog}
                blogs={this.state.blogs}
              />
              <button onClick={e => this.setState({ blogVisible: false })}>cancel</button>
            </div>
          </div>
        )
      }



  
    return (
      <div>
        <div>
          <h1>Tervetuloa Blogisivulle</h1>

         
          {this.state.user === null ?
            loginForm() :
            <div>
              <p>{this.state.user.name} logged in</p>
              {blogForm()}
            </div>
          }
    
        </div>
      </div>
    )
  }
}
export default App
