import React from 'react'

const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h1>Added blogs</h1>
      <ul>
        <li>blogi1</li>
        <li>blogi2</li>
      </ul>
    </div>
  )
}

export default User