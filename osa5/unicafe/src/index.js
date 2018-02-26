import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ statistic }) => {
  return (
    <tr>
      <td>{statistic.text}</td>
      <td>{statistic.number}</td>
    </tr>
  )
}

const Statistics = ({ state }) => {
  const title = 'statistics'
  const good = {
    text: 'good',
    number: state.good
  }
  const neutral = {
    text: 'neutral',
    number: state.ok
  }
  const bad = {
    text: 'bad',
    number: state.bad
  }
  const total = good.number + neutral.number + bad.number

  const average = {
    text: 'average',
    number: ((good.number * 1 + neutral.number * 0 + bad.number * -1) / total).toFixed(2)
  }
  const positive = {
    text: 'positive',
    number: (good.number / total).toFixed(2) + ' %'
  }

  if (total === 0) {
    return (
      <div>
        <h1>{title}</h1>
        <p>no feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>{title}</h1>
      <table>
        <tbody>
          <Statistic statistic={good} />
          <Statistic statistic={neutral} />
          <Statistic statistic={bad} />
          <Statistic statistic={average} />
          <Statistic statistic={positive} />
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component {
  click = (option) => {
    return () => {
      if (option === 'good') {
        store.dispatch({ type: 'GOOD' })
      } else if (option === 'neutral') {
        store.dispatch({ type: 'OK' })
      } else if (option === 'bad') {
        store.dispatch({ type: 'BAD' })
      }
    }
  }

  render() {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={this.click('good')} text='good' />
        <Button handleClick={this.click('neutral')} text='neutral' />
        <Button handleClick={this.click('bad')} text='bad' />

        <Statistics state={store.getState()} />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)