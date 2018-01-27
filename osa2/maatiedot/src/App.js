import React from 'react';
import axios from 'axios'

const CountrySearch = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries: <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const CountryList = ({ countries }) => {
  return (
    <div>
      <ul>
        {countries}
      </ul>
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt="flag" width={300} height={200} />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      countryToShow: {}
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleCountryClick = (country) => {
    this.setState({ countryToShow: country })
  }

  render() {
    const countriesToShow = this.state.countries.filter(      // filter ciuntries
      country => country.name.toUpperCase().includes(this.state.filter.toUpperCase())
    ).map(country =>                                          // create a list containing a clickable button for each country
      <li key={country.name}><button onClick={() => { this.handleCountryClick(country) }}>{country.name}</button></li>
      )

    if (countriesToShow.length > 10 && this.state.filter.length > 0) { // check filter length just to not show "error" message in the beginning
                                                                        // (doesn't really solve that but yeah. it annoyed me.)
      return (
        <div>
          <CountrySearch filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
          too many matches, please be more spesific
        </div>
      )
    } else if (countriesToShow.length === 1 || Object.keys(this.state.countryToShow).length !== 0) { // show country info
      const country = countriesToShow.length === 1 ? countriesToShow[0] : this.state.countryToShow
      return (
        <div>
          <CountrySearch filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
          <CountryInfo country={country} />
        </div>
      )
    } else if (countriesToShow.length > 1 && countriesToShow.length <= 10) { // show country list
      return (
        <div>
          <CountrySearch filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
          <CountryList countries={countriesToShow} />
        </div>
      )
    } else { // else show only the search box
      return (
        <div>
          <CountrySearch filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        </div>
      )
    }
  }
}

export default App;
