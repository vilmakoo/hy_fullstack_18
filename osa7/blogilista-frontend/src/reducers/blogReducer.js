import blogService from '../services/blogs'

const initialState = {
  list: [],
  newBlogTitle: '',
  newBlogAuthor: '',
  newBlogUrl: ''
}

const blogReducer = (state = initialState, action) => {
  let newState

  switch (action.type) {
  case 'INIT_BLOGS':
    newState = {
      list: action.data,
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    }
    break

  case 'CREATE':
    newState = {
      list: state.list.concat(action.data),
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    }
    break

  case 'DELETE': {
    const deletedBlog = action.data
    newState = {
      list: state.list.filter(blog => blog._id !== deletedBlog._id),
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    }
  }
    break

  case 'LIKE': {
    const updatedBlog = action.data
    newState = {
      list: state.list.map(blog => blog._id !== updatedBlog._id ? blog : updatedBlog),
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    }
  }
    break

  case 'SET_NEW_BLOG_TITLE':
    newState = { ...state, newBlogTitle: action.data }
    break

  case 'SET_NEW_BLOG_AUTHOR':
    newState = { ...state, newBlogAuthor: action.data }
    break

  case 'SET_NEW_BLOG_URL':
    newState = { ...state, newBlogUrl: action.data }
    break

  case 'CLEAR_NEW_BLOG_FIELDS':
    newState = {
      ...state,
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    }
    break

  default:
    newState = state
    break
  }

  return newState
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.like(blog)

    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog, onSuccess, onFailure) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog._id)

      dispatch({
        type: 'DELETE',
        data: blog
      })
      onSuccess()
    } catch (exception) {
      onFailure()
    }
  }
}

export const setNewBlogField = (field, value) => {
  if (field === 'newBlogTitle') {
    return {
      type: 'SET_NEW_BLOG_TITLE',
      data: value
    }
  } else if (field === 'newBlogAuthor') {
    return {
      type: 'SET_NEW_BLOG_AUTHOR',
      data: value
    }
  }
  else if (field === 'newBlogUrl') {
    return {
      type: 'SET_NEW_BLOG_URL',
      data: value
    }
  }
}

export const createBlog = (blog, onSuccess, onFailure) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'CREATE',
        data: newBlog
      })
      onSuccess(newBlog.title, newBlog.author)
    } catch (exception) {
      dispatch({
        type: 'CLEAR_NEW_BLOG_FIELDS'
      })
      onFailure()
    }
  }
}

export default blogReducer