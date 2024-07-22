import { useState } from "react";

export default function AddName({persons, setPersons}) {

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("button clicked", event.target);
        //trim inputs
        const trimmedName = newName.trim();
        const trimmedNumber = newNumber.trim();

        //validate check if name or number is empty
        if (!trimmedName || !trimmedNumber) {
            alert("Name and number cannot be blank")
            return;
        }
        // Check for duplicate names before adding
        const duplicateName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase().trim())
        const duplicateNumber = persons.find(person => person.number.trim() === newNumber.trim());
        if (duplicateName || duplicateNumber) {
            if (duplicateName) { alert(`${newName} is already added to phonebook`) }
            if (duplicateNumber) { alert(`${newNumber} is already added to phonebook`) }
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: String(persons.length + 1),
            };
            setPersons(persons.concat(personObject));
            setNewName("");
            setNewNumber("");
        }
    };
    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )

}