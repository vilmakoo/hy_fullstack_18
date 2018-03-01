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

export const clearNotificationField = () => {
  return {
    type: 'CLEAR'
  }
}

export const notify = (notification) => {
  return {
    type: 'NOTIFY',
    notification
  }
}

export default notificationReducer