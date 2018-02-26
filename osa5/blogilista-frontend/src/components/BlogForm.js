import React from 'react'
import blogService from '../services/blogs'

const Form = ({ addBlog, title, handleBlogFieldChange, author, url }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
            <input
          type="text"
          name="newBlogTitle"
          value={title}
          onChange={handleBlogFieldChange}
        />
      </div>
      <div>
        author:
            <input
          type="text"
          name="newBlogAuthor"
          value={author}
          onChange={handleBlogFieldChange}
        />
      </div>
      <div>
        url:
            <input
          type="text"
          name="newBlogUrl"
          value={url}
          onChange={handleBlogFieldChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      notification: null,
      error: false
    }
    this.updateBlogList = props.updateBlogList
    this.notify = props.notify
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl
    }

    try {
      const newBlog = await blogService
        .create(blogObject)
      this.setState({
        newBlogTitle: '',
        newBlogAuthor: '',
        newBlogUrl: ''
      })

      this.notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`, false)
      this.updateBlogList(newBlog)
    } catch (exception) {
      this.notify('failed to create a new blog', true)
    }
  }

  handleNewBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <Togglable buttonLabel="new blog">
          <Form
            addBlog={this.addBlog}
            title={this.state.newBlogTitle}
            author={this.state.newBlogAuthor}
            url={this.state.newBlogUrl}
            handleBlogFieldChange={this.handleNewBlogFieldChange}
          />
        </Togglable>
      </div>
    )
  }
}

export default BlogForm