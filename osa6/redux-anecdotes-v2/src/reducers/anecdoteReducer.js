const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const old = state.filter(a => a.id !== action.data.id)
    const voted = state.find(a => a.id === action.data.id)

    return [...old, { ...voted, votes: action.data.votes }]
  }
  case 'CREATE':
    return [...state, action.data]

  case 'INIT_ANECDOTES':
    return action.data

  default:
    break
  }

  return state
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const voting = (data) => {
  return {
    type: 'VOTE',
    data
  }
}


export default reducer