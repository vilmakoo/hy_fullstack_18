import React from 'react'
import PropTypes from 'prop-types'


class Togglable extends React.Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const buttonStyle = {
      background: 'none',
      border: 'none',
      fontWeight: 'bold'
    }
    return (
      <div>
        <div style={hideWhenVisible} className="titleAndAuthor">
          <button style={buttonStyle} onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible} className="togglableContent">
          <button style={buttonStyle} onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Togglable