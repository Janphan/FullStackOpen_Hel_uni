const Persons = ({ persons, onDelete }) => {
    return (
        <>
            <ul className="persons-list">
                {persons.map((person) => (
                    <li key={person.id} className="person-row">
                        <span className="person-text">{person.name} : {person.number}</span>
                        <button className="delete-btn" onClick={() => onDelete(person.id)}>Delete</button>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default Persons;