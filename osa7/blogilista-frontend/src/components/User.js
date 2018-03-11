import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  const { users, userId } = props

  const user = users.find(u => u.id === userId)
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        <li>blogi1</li>
        <li>blogi2</li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.user.userlist,
    userId: ownProps.userId
  }
}

const ConnectedUser = connect(
  mapStateToProps
)(User)

export default ConnectedUser