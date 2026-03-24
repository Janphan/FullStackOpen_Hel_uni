const Person = ({ person, onDelete }) => {
    return (
        <li className="person-row">
            <span className="person-text">{person.name} : {person.number}</span>
            <button className="delete-btn" onClick={() => onDelete(person.id)}>Delete</button>
        </li>
    )
}

export default Person;