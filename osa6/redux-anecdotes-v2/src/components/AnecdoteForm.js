import React from 'react'
import { connect } from 'react-redux'
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
    this.props.anecdoteCreation(content)
    this.props.notify(`creating new anecdote '${content}' succeeded`)
    setTimeout(() => {
      this.props.clearNotificationField()
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

const mapDispatchToProps = {
  anecdoteCreation,
  notify,
  clearNotificationField
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
