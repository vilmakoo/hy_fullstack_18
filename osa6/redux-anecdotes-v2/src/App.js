import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

class App extends React.Component {

  render() {
    if (this.props.store.getState().notification.length > 0) {
      return (
        <div>
          <h1>Programming anecdotes</h1>
          <Filter store={this.props.store} />
          <Notification store={this.props.store} />
          <AnecdoteList store={this.props.store} />
          <AnecdoteForm store={this.props.store} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>Programming anecdotes</h1>
          <Filter store={this.props.store} />
          <AnecdoteList store={this.props.store} />
          <AnecdoteForm store={this.props.store} />
        </div>
      )
    }
  }
}

export default App