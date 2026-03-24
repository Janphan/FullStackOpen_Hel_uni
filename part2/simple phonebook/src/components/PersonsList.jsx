import Person from "./Person";

const PersonsList = ({ persons, onDelete }) => {
    return (
        <>
            <ul className="persons-list">
                {persons.map((person) => (
                    <Person key={person.id} person={person} onDelete={onDelete} />
                ))}
            </ul>

        </>
    )
}

export default PersonsList;