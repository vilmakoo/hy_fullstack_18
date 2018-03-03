import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notify, clearNotificationField } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const handleVoting = (anecdote) => () => {
    props.voting(anecdote.id)
    props.notify(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      props.clearNotificationField()
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.visibleAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={handleVoting(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
    </div>
  )

}

const anecdotesToShow = (anecdotes, filter) => {
  if (filter === 'ALL') {
    return anecdotes
  }
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voting,
  notify,
  clearNotificationField
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
