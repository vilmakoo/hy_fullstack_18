import React from 'react';
import ReactDOM from 'react-dom';

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
        number: state.neutral
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
                <Statistic statistic={good} />
                <Statistic statistic={neutral} />
                <Statistic statistic={bad} />
                <Statistic statistic={average} />
                <Statistic statistic={positive} />
            </table>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    click = (option) => {
        return () => {
            this.setState({
                [option]: this.state[option] + 1
            })
        }
    }

    render() {
        return (
            <div>
                <h1>give feedback</h1>
                <Button handleClick={this.click('good')} text='good' />
                <Button handleClick={this.click('neutral')} text='neutral' />
                <Button handleClick={this.click('bad')} text='bad' />

                <Statistics state={this.state} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
