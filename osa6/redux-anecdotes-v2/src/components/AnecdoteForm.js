import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notify, clearNotificationField } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.store.dispatch(
      anecdoteCreation(content)
    )
    this.store.dispatch(notify(`creating new anecdote '${content}' succeeded`))
    setTimeout(() => {
      this.store.dispatch(clearNotificationField())
    }, 5000)

    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
