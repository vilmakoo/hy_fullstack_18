import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.filterChange(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

const ConnectedFilter = connect(
  null,
  { filterChange }
)(Filter)

export default ConnectedFilter