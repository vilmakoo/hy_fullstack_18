import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  username: '',
  password: '',
  user: null,
  userlist: []
}

const userReducer = (state = initialState, action) => {
  let newState

  switch (action.type) {
    case 'INIT_USERS':
      newState = {
        username: state.username,
        password: state.password,
        user: state.user,
        userlist: action.userlist
      }
      break

    case 'SET_USER':
      newState = {
        username: '',
        password: '',
        user: action.user,
        userlist: state.userlist
      }
      break

    case 'LOGOUT':
      newState = {
        username: '',
        password: '',
        user: null,
        userlist: state.userlist
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

export const initializeUserList = () => {
  return async (dispatch) => {
    const users = await userService.getAll()

    dispatch({
      type: 'INIT_USERS',
      userlist: users
    })
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