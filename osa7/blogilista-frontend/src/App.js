import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Notification from './components/Notification'
import './index.css'
import { notify } from './reducers/notificationReducer'
import { initializeUserList, initializeUser, login, logout, setUsername, setPassword } from './reducers/userReducer'
import { initializeBlogs, addLike, deleteBlog } from './reducers/blogReducer'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import User from './components/User'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initializeUserList()
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

    const loggedInView = () => {
      return (
        <div>
          <p>{this.props.user.user.name} logged in <button onClick={this.logout}>logout</button></p>

          <Router>
            <div>
              <Route exact path="/users" render={() => <UserList />} />
              <Route exact path="/" render={() => <BlogList bloglist={this.props.bloglist} handleLikeOf={this.handleLikeOf} handleDeleteOf={this.handleDeleteOf} />} />
              <Route exact path="/users/:id" render={({ history, match }) =>
                <User history={history} userId={match.params.id} />
              }
              />
            </div>
          </Router>
        </div>
      )
    }

    return (
      <div>
        <h1>HIENO BLOGILISTA</h1>
        <Notification message={this.props.notification.message} error={this.props.notification.error} />

        {this.props.user.user === null ?
          loginForm() :
          loggedInView()
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
    bloglist: state.blogs.list,
    users: state.user.userlist
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
  deleteBlog,
  initializeUserList
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
