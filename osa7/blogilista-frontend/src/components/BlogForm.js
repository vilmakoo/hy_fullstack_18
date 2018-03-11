import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { setNewBlogField, createBlog } from '../reducers/blogReducer'

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
    this.setState({ visible: !this.state.visible })
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
  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.props.newBlogTitle,
      author: this.props.newBlogAuthor,
      url: this.props.newBlogUrl
    }

    const onSuccess = (title, author) => {
      this.props.notify({
        message: `a new blog '${title}' by ${author} added`,
        error: false
      }, 5)
    }
    const onFailure = () => {
      this.props.notify({
        message: 'failed to create a new blog',
        error: true
      }, 5)
    }

    this.props.createBlog(blogObject, onSuccess, onFailure)
  }

  handleNewBlogFieldChange = (event) => {
    this.props.setNewBlogField(event.target.name, event.target.value)
  }

  render() {
    return (
      <div>
        <Togglable buttonLabel="new blog">
          <Form
            addBlog={this.addBlog}
            title={this.props.newBlogTitle}
            author={this.props.newBlogAuthor}
            url={this.props.newBlogUrl}
            handleBlogFieldChange={this.handleNewBlogFieldChange}
          />
        </Togglable>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    newBlogTitle: state.blogs.newBlogTitle,
    newBlogAuthor: state.blogs.newBlogAuthor,
    newBlogUrl: state.blogs.newBlogUrl
  }
}

const mapDispatchToProps = {
  notify,
  setNewBlogField,
  createBlog
}

const ConnectedBlogForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm