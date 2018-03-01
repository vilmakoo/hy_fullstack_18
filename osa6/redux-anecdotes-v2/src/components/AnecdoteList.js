import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notify, clearNotificationField } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  handleVoting = (anecdote) => {
    return () => {
      this.store.dispatch(voting(anecdote.id))
      this.store.dispatch(notify(`you voted ${anecdote.content}`))
      setTimeout(() => {
        this.store.dispatch(clearNotificationField())
      }, 5000)
    }
  }

  render() {
    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.store.getState()

      console.log(filter)

      if (filter === 'ALL') {
        return anecdotes
      }

      console.log(anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())))

      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow()
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
              has {anecdote.votes}
                <button onClick={this.handleVoting(anecdote)}>
                vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default AnecdoteList
