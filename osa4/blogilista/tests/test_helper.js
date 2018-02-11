const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'bloggaus on jees',
    author: 'blogimestari',
    url: 'http://blogimestarinblogi.com',
    likes: 6
  },
  {
    title: 'elämästä ja muurahaisten tuijottelusta',
    author: 'oman elämänsä muurahaiskarhu',
    url: 'http://ahkeruusonhyve.fi',
    likes: 3
  }
]

const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  initialBlogs, format, blogsInDb, usersInDb
}