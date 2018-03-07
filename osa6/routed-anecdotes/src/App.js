import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Image, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const Menu = ({ anecdotes, addNew }) => {
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const style = {
    backgroundColor: 'lightBlue',
    fontSize: 20,
    padding: 5
  }

  const activeStyle = {
    fontWeight: 'bold'
  }

  return (
    <div>
      <Router>
        <div>
          <div style={style}>
            <NavLink exact to="/" activeStyle={activeStyle}>home</NavLink> &nbsp;
            <NavLink to="/create" activeStyle={activeStyle}>create</NavLink> &nbsp;
            <NavLink to="/about" activeStyle={activeStyle}>about</NavLink> &nbsp;
        </div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" render={({ history }) => <CreateNew addNew={addNew} history={history} />} />
          <Route path="/about" render={() => <About />} />
          <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={anecdoteById(match.params.id)} />}
          />
        </div>
      </Router>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>

    <Grid>
      <Row className="show-grid">
        <Col xs={6} md={6}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={6} md={6}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/176px-Alan_Turing_Aged_16.jpg" rounded />
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => {
  const style = {
    margin: 30
  }

  return (
    <div style={style}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

      See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
    </div>
  )
}

const Notification = ({ notification }) => {
  const style = {
    color: 'green',
    padding: 10,
    border: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    // console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content:</ControlLabel>
            <FormControl
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <ControlLabel>author:</ControlLabel>
            <FormControl
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel>url for more info:</ControlLabel>
            <FormControl
              type="text"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
            <br />
            <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `A new anecdote ${anecdote.content} created!`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000);
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    if (this.state.notification.length > 0) {
      return (
        <div className="container">
          <h1>Software anecdotes</h1>
          <Notification notification={this.state.notification} />
          <Menu anecdotes={this.state.anecdotes} addNew={this.addNew} />
          <Footer />
        </div>
      )
    }
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Menu anecdotes={this.state.anecdotes} addNew={this.addNew} />
        <Footer />
      </div>
    )
  }
}

export default App;
