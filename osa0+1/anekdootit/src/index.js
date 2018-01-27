import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: 0,
            mostVoted: 0
        }
    }

    clickVote = () => {
        const votes = this.props.anecdotes[this.state.selected].votes + 1
        this.props.anecdotes[this.state.selected].votes = votes
        if (votes > this.props.anecdotes[this.state.mostVoted].votes) {
            this.setState({
                mostVoted: this.state.selected
            })
        }
        this.setState({
            votes: votes
        })
    }

    clickNext = () => {
        this.setState({
            selected: Math.floor(Math.random() * 6)
        })

    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected].anecdote}</p>
                <p>has {this.props.anecdotes[this.state.selected].votes} votes</p>
                <Button handleClick={this.clickVote} text='vote' />
                <Button handleClick={this.clickNext} text='next anecdote' />
                
                <h1>anecdote with most votes:</h1>
                <p>{this.props.anecdotes[this.state.mostVoted].anecdote}</p>
                <p>has {this.props.anecdotes[this.state.mostVoted].votes} votes</p>
            </div>
        )
    }
}

const anecdotes = [
    {
        anecdote: 'If it hurts, do it more often',
        votes: 0
    },
    {
        anecdote: 'Adding manpower to a late software project makes it later!',
        votes: 0
    },
    {
        anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        votes: 0
    },
    {
        anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes: 0
    },
    {
        anecdote: 'Premature optimization is the root of all evil.',
        votes: 0
    },
    {
        anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        votes: 0
    }
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)