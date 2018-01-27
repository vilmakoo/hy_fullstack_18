import React from 'react'

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <div>
            <h2>Lisää uusi tai muuta olemassa olevaa numeroa</h2>

            <form onSubmit={addPerson}>
                <div>
                    nimi: <input
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    numero: <input
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm