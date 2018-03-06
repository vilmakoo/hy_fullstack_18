import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notify, clearNotificationField } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = (props) => {
  const handleVoting = (anecdote) => async () => {
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    props.voting(updatedAnecdote)

    props.notify(`you voted '${updatedAnecdote.content}'`)
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
              has {anecdote.votes} votes
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
