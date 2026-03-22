import Person from "./Person";

const PersonsList = ({ persons }) => {
    const list = Array.isArray(persons) ? persons : [];

    return (
        <>
            <ul>
                {list.map((person) => (
                    <Person key={person.id} person={person} />
                ))}
            </ul>
        </>
    )
}

export default PersonsList;