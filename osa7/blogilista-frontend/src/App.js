import React from 'react'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm';
import Notification from './components/Notification'
import './index.css'
import { notify } from './reducers/notificationReducer'
import { initializeUser, login, logout, setUsername, setPassword } from './reducers/userReducer'
import { initializeBlogs, addLike, deleteBlog } from './reducers/blogReducer'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initializeUser()
  }

  login = (event) => {
    event.preventDefault()
    const onSuccess = () => {
      this.notify('login succeeded', false)
    }
    const onFailure = () => {
      this.notify('wrong username or password', true)
    }
    this.props.login(this.props.user.username, this.props.user.password, onSuccess, onFailure)
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.logout()
    this.notify('logged out', false)
  }

  notify = (message, error) => {
    this.props.notify({
      message,
      error
    }, 5)
  }

  // updateBlogList = (blog) => {
  //   this.setState({ blogs: this.state.blogs.concat(blog) })
  // }

  handleLikeOf = (id) => {
    return () => {
      const blog = this.props.bloglist.find(b => b._id === id)
      this.props.addLike(blog)
      this.notify(`blog ${blog.title} liked`, false)
    }
  }

  handleDeleteOf = (id) => {
    return async () => {
      const onSuccess = () => {
        this.notify('blog deleted')
      }

      const onFailure = () => {
        this.notify('you\'re not authorized to delete this blog', true)
      }

      const blog = this.props.bloglist.find(b => b._id === id)

      if (window.confirm(`delete ${blog.name} by ${blog.author}?`)) {
        this.props.deleteBlog(blog, onSuccess, onFailure)
      }
    }

  }

  handleLoginFieldChange = (event) => {
    if (event.target.name === 'username') {
      this.props.setUsername(event.target.value)
    } else if (event.target.name === 'password') {
      this.props.setPassword(event.target.value)
    }
  }

  render() {
    const loginForm = () => (
      <div>
        <Notification message={this.props.notification.message} error={this.props.notification.error} />

        <h2>Log in to application</h2>
        <form onSubmit={this.login}>
          <div>
            username:
              <input
              type="text"
              name="username"
              value={this.props.user.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
              <input
              type="password"
              name="password"
              value={this.props.user.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const blogs = () => (
      <div>
        <h2>blogs</h2>

        <Notification message={this.props.notification.message} error={this.props.notification.error} />

        <BlogForm />

        <h2>all blogs</h2>
        <p>{this.props.user.user.name} logged in <button onClick={this.logout}>logout</button></p>

        {this.props.bloglist.sort((blog1, blog2) => {
          return blog2.likes - blog1.likes
        }).map(blog =>
          <Blog key={blog._id} blog={blog} handleLikeOf={this.handleLikeOf} handleDeleteOf={this.handleDeleteOf} />
          )
        }
      </div>
    )

    return (
      <div>
        {this.props.user.user === null ?
          loginForm() :
          blogs()
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
    blogs: state.blogs,
    bloglist: state.blogs.list
  }
}

const mapDispatchToProps = {
  notify,
  initializeUser,
  login,
  logout,
  setUsername,
  setPassword,
  initializeBlogs,
  addLike,
  deleteBlog
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;
