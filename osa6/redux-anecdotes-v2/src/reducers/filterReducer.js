const filterReducer = (state = 'ALL', action) => {
  let newState = state

  switch (action.type) {
  case 'SET_FILTER':
    newState = action.filter
    break

  default:
    break
  }

  return newState
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer