import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const handleVoting = (anecdote) => async () => {
    props.vote(anecdote)

    props.notify(`you voted '${anecdote.content}'`, 5)
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
  vote,
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
