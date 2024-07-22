import Person from "./Person";

const PersonsList = ({personsToShow}) => {
    return (
        <>
        <ul>
                {personsToShow.map((person) => (
                    <Person key={person.id} person={person} />
                ))}
            </ul>
        </>
    )
}

export default PersonsList;