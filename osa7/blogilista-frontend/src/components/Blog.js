import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Togglable from './Togglable'

const BlogInfo = ({ blog, handleLike, handleDelete, currentUser }) => {
  const url = <p><a href={blog.url}>{blog.url}</a></p>
  const likes = <p>{blog.likes} likes <button onClick={handleLike(blog._id)}>like</button></p>

  let addedBy
  if (blog.user !== undefined) {
    addedBy = <p>added by {blog.user.name}</p>
  } else {
    addedBy = <p>blog has no adder</p>
  }


  let deleteButton
  if (blog.user === undefined || blog.user.username === currentUser.username) {
    deleteButton = <p><button onClick={handleDelete(blog._id)}>delete</button></p>
  }

  return (
    <div>
      {url}
      {likes}
      {addedBy}
      {deleteButton}
    </div>
  )
}

class Blog extends React.Component {
  render() {
    const blogStyle = {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle} >
        <Togglable buttonLabel={`${this.props.blog.title} by ${this.props.blog.author}`} >
          <BlogInfo blog={this.props.blog} handleLike={this.props.handleLikeOf} handleDelete={this.props.handleDeleteOf} currentUser={this.props.currentUser} />
        </Togglable>
      </div >
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeOf: PropTypes.func.isRequired,
  handleDeleteOf: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.user.user
  }
}

const ConnectedBlog = connect(
  mapStateToProps
)(Blog)

export default ConnectedBlog;