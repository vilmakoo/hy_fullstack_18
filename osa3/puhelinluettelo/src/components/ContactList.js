import React from 'react';
import Person from './Person'


const ContactList = ({ persons, handleDelete }) => {
    return (
        <div>
            <h2>Numerot</h2>
            <ul>
                {persons.map(
                    person =>
                        <Person key={person.id} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete} />
                )}
            </ul>
        </div>
    )
}

export default ContactList