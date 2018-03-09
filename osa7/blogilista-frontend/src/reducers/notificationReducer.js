const initialState = {
  message: '',
  error: false

}

const notificationReducer = (state = initialState, action) => {
  let newState = state

  switch (action.type) {
    case 'NOTIFY':
      newState = {
        message: action.message,
        error: action.error
      }
      break

    case 'CLEAR':
      newState = {
        message: '',
        error: false
      }
      break

    default:
      newState = state
  }

  return newState
}

export const notify = (notification, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message: notification.message,
      error: notification.error

    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, seconds * 1000)
  }
}

export default notificationReducer