import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
  username: '',
  password: '',
  user: null
}

const userReducer = (state = initialState, action) => {
  let newState

  switch (action.type) {
    case 'SET_USER':
      newState = {
        username: '',
        password: '',
        user: action.user
      }
      break

    case 'LOGOUT':
      newState = {
        username: '',
        password: '',
        user: null
      }
      break

    case 'SET_USERNAME':
      newState = { ...state, username: action.username }
      break

    case 'SET_PASSWORD':
      newState = { ...state, password: action.password }
      break

    default:
      newState = state
      break
  }

  return newState
}

export const initializeUser = () => {
  let user = null

  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
  }

  return {
    type: 'SET_USER',
    user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const login = (username, password, onSuccess, onFailure) => {
  return async (dispatch) => {
    let user = null

    try {
      user = await loginService.login({
        username,
        password
      })
      console.log(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      onSuccess()
    } catch (exception) {
      onFailure()
    }

    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username
  }
}

export const setPassword = (password) => {
  return {
    type: 'SET_PASSWORD',
    password
  }
}

export default userReducer