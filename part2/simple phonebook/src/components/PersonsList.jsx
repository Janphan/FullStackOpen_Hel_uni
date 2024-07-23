import Person from "./Person";

const PersonsList = ({persons}) => {
    return (
        <>
        <ul>
                {persons.map((person) => (
                    <Person key={person.id} person={person} />
                ))}
            </ul>
        </>
    )
}

export default PersonsList;