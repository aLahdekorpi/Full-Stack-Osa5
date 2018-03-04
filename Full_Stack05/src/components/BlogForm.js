import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
  

const BlogForm = ({ handleSubmit, handleTitleChange, handleAuthorChange,  title,  author, blogs }) => {
    return (
      <div>
        <button onClick={()  => window.localStorage.removeItem("loggedUser")}> LogOut</button>

        <h2>Luo uusi blogi</h2>

        <form onSubmit={handleSubmit}>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
          <button type="submit">tallenna</button>
          </form>
          <h2>blogit</h2>

          {blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
          )}
        </div>
    )}
    export default BlogForm