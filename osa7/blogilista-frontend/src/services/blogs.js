import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const like = async (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }

  await axios.put(`${baseUrl}/${blog._id}`, updatedBlog)

  return updatedBlog
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, like, remove }