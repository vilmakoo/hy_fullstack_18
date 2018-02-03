import React from 'react'

const Person = ({ name, number, id, handleDelete }) => {
    return (
        <div>
            <li>{name} {number} <button onClick={handleDelete(id)}>poista</button></li>
        </div>
    )
}

export default Person