import React from 'react'
import { filterChange } from '../reducers/filterReducer'

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  handleChange = (event) => {
    this.store.dispatch(filterChange(event.target.value))
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

export default Filter