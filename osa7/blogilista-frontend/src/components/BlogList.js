import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ bloglist, handleLikeOf, handleDeleteOf }) => (
  <div>
    <h2>blogs</h2>

    <BlogForm />

    <h2>all blogs</h2>

    {bloglist.sort((blog1, blog2) => {
      return blog2.likes - blog1.likes
    }).map(blog =>
      <Blog key={blog._id} blog={blog} handleLikeOf={handleLikeOf} handleDeleteOf={handleDeleteOf} />
    )
    }
  </div>
)

export default BlogList