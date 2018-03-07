const notificationReducer = (state = '', action) => {
  let newState = state

  switch (action.type) {
  case 'NOTIFY':
    newState = action.notification
    break

  case 'CLEAR':
    newState = ''
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
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, seconds * 1000)
  }
}

export default notificationReducer