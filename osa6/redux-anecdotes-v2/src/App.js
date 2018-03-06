import React from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

class App extends React.Component {

  componentDidMount = async () => {
    const anecdotes = await anecdoteService.getAll()
    this.props.anecdoteInitialization(anecdotes)
  }

  render() {
    if (this.props.notification.length > 0) {
      return (
        <div>
          <h1>Programming anecdotes</h1>
          <Notification />
          <Filter />
          <AnecdoteList />
          <AnecdoteForm />
        </div>
      )
    } else {
      return (
        <div>
          <h1>Programming anecdotes</h1>
          <Filter />
          <AnecdoteList />
          <AnecdoteForm />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  { anecdoteInitialization }
)(App)

export default ConnectedApp