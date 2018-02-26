import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm';
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notification: null,
      error: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        user
      })
      this.notify('login succeeded', false)
    } catch (exception) {
      this.notify('wrong username or password', true)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({
      user: null
    })
    this.notify('logged out', false)
  }

  notify = (message, error) => {
    this.setState({
      notification: message,
      error: error
    })
    setTimeout(() => {
      this.setState({ notification: null, error: false })
    }, 5000)
  }

  updateBlogList = (blog) => {
    this.setState({ blogs: this.state.blogs.concat(blog) })
  }

  handleLikeOf = (id) => {
    return async () => {
      const blog = this.state.blogs.find(b => b._id === id)

      const updatedBlog = await blogService.like(blog)

      this.setState({
        blogs: this.state.blogs.map(blog => blog._id !== id ? blog : updatedBlog)
      })
    }
  }

  handleDeleteOf = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.find(b => b._id === id)

        if (window.confirm(`delete ${blog.name} by ${blog.author}?`)) {
          await blogService.remove(id)
          this.setState({
            blogs: this.state.blogs.filter(blog => blog._id !== id)
          })
        }
        this.notify('blog deleted')
      } catch (exception) {
        this.notify('you\'re not authorized to delete this blog', true)
      }
    }

  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const loginForm = () => (
      <div>
        <Notification message={this.state.notification} error={this.state.error} />

        <h2>Log in to application</h2>
        <form onSubmit={this.login}>
          <div>
            username:
              <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
              <input
              type="password"
              name="password"
              value={this.state.password}
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

        <Notification message={this.state.notification} error={this.state.error} />

        <BlogForm updateBlogList={this.updateBlogList} notify={this.notify} />

        <h2>all blogs</h2>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
        {this.state.blogs.sort((blog1, blog2) => {
          return blog2.likes - blog1.likes
        }).map(blog =>
          <Blog key={blog._id} blog={blog} handleLikeOf={this.handleLikeOf} handleDeleteOf={this.handleDeleteOf} currentUser={this.state.user} />
          )
        }
      </div>
    )

    return (
      <div>
        {this.state.user === null ?
          loginForm() :
          blogs()
        }
      </div>
    )
  }
}

export default App;
