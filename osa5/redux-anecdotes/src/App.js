import React from 'react';

class App extends React.Component {

  addNewAnacdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: { content: content }
    })
    e.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a1, a2) => {
            return a2.votes - a1.votes
          })
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={e =>
                  this.props.store.dispatch({
                    type: 'VOTE',
                    data: { id: anecdote.id }
                  })
                }>
                  vote
              </button>
              </div>
            </div>
          )}
        <h2>create new</h2>
        <form onSubmit={this.addNewAnacdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App