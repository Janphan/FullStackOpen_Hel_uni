import { useState } from "react";
import PersonsList from "./PersonsList";
import FilterInput from "./FilterInput";

export default function FilterName({ persons }) {
    const [searchName, setSearchName] = useState("");
    const [showAll, setShowAll] = useState(true);

    const handleSearch = (event) => {
        console.log("search", event.target.value);
        setSearchName(event.target.value);
        setShowAll(false);
    }

    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())) //equal to what here
    return (
        <>
            <FilterInput searchName={searchName} handleSearch={handleSearch} />
            <h2>Numbers</h2>
            <PersonsList personsToShow={personsToShow} />
        </>
    )
}