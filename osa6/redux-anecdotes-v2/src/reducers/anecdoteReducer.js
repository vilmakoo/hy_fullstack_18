import anecdoteService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

    await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}


export default reducer