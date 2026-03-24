import { useState } from "react";
import NameInput from "./NameInput";
import NumberInput from "./NumberInput";
import personsService from "../services/persons";

export default function AddName({ persons, setPersons, onPersonAdded }) {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedName = newName.trim();
        const trimmedNumber = newNumber.trim();

        if (!trimmedName || !trimmedNumber) {
            alert("Name and number cannot be blank");
            return;
        }

        const duplicateNumber = persons.find(
            (person) => person.number.trim() === trimmedNumber
        );

        if (duplicateNumber) {
            alert(`${trimmedNumber} is already added to phonebook`);
            return;
        }

        const personObject = {
            name: trimmedName,
            number: trimmedNumber,
        };

        try {
            const newPerson = await personsService.create(personObject);
            setPersons((prevPersons) => prevPersons.concat(newPerson));
            onPersonAdded(`Added ${trimmedName}`);
            setNewName("");
            setNewNumber("");
        } catch (error) {
            alert("Failed to save person to server");
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    return (
        <>
            <form className="add-form" onSubmit={handleSubmit}>
                <NameInput newName={newName} handleNameChange={handleNameChange} />
                <NumberInput newNumber={newNumber} handleNumberChange={handleNumberChange} />
                <div className="submit-row">
                    <button className="primary-btn" type="submit">Add</button>
                </div>
            </form>
        </>
    );
}