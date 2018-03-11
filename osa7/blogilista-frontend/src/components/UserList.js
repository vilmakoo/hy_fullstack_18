import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeUserList } from '../reducers/userReducer'

const UserInfo = ({ user }) => {
  const blogCount = user.blogs.length
  return (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{blogCount}</td>
    </tr>
  )
}

class UserList extends React.Component {
  componentWillMount() {
    this.props.initializeUserList()
  }

  render() {
    return (
      <div>
        <h2>users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs added</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user =>
              <UserInfo key={user.id} user={user} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.userlist
  }
}

const mapDispatchToProps = {
  initializeUserList
}

const ConnectedUserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)

export default ConnectedUserList