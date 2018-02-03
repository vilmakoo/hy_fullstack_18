import React from 'react';
import ContactList from './components/ContactList'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      searchKeyword: '',
      notification: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  addPerson = (event) => {
    event.preventDefault()

    if (this.state.persons.map(person => person.name).includes(this.state.newName)) {
      if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        this.changeNumber()
      }
    } else {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            notification: `henkilön ${newPerson.name} lisääminen onnistui`
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
        })
    }
  }

  changeNumber = () => {
    const person = this.state.persons.find(p => p.name === this.state.newName)
    const id = person.id
    const changedPerson = { ...person, number: this.state.newNumber }

    personService
      .editPerson(id, changedPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.map(person => person.id !== id ? person : changedPerson),
          newName: '',
          newNumber: '',
          notification: `henkilön ${changedPerson.name} numeroa muutettiin`
        })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 5000)
      })
      .catch(error => {
        personService
          .create(changedPerson)
          .then(newPerson => {
            personService.getAll()
              .then(persons => {
                this.setState({
                  persons: persons,
                  newName: '',
                  newNumber: '',
                  notification: `henkilön ${newPerson.name} numeroa muutettiin`
                })
                setTimeout(() => {
                  this.setState({ notification: null })
                }, 5000)
              })
          })
      })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleSearchKeywordChange = (event) => {
    this.setState({ searchKeyword: event.target.value })
  }

  handleDeleteOf = (id) => {
    return () => {
      const person = this.state.persons.find(p => p.id === id)

      if (window.confirm(`poistetaanko ${person.name}`)) {
        personService
          .remove(id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(person => person.id !== id),
              notification: `henkilö ${person.name} poistettu`
            })
            setTimeout(() => {
              this.setState({ notification: null })
            }, 5000)
          })
      }
    }
  }

  render() {
    const personsToShow = this.state.persons.filter(
      person => person.name.toUpperCase().includes(this.state.searchKeyword.toUpperCase())
    )

    return (
      <div>
        <h2>Puhelinluettelo</h2>

        <Notification message={this.state.notification} />

        rajaa näytettäviä nimen perusteella: <input
          value={this.state.searchKeyword}
          onChange={this.handleSearchKeywordChange}
        />

        <PersonForm addPerson={this.addPerson} newName={this.state.newName}
          handleNameChange={this.handleNameChange} newNumber={this.state.newNumber}
          handleNumberChange={this.handleNumberChange} />

        <ContactList persons={personsToShow} handleDelete={this.handleDeleteOf} />
      </div>
    )
  }
}

export default App