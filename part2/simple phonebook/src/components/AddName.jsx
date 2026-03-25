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

        // Check for duplicate name
        const duplicateName = persons.find(
            (person) => person.name.trim().toLowerCase() === trimmedName.toLowerCase()
        );
        if (duplicateName) {
            const confirmUpdate = window.confirm(
                `${trimmedName} is already added to phonebook. Do you want to update the number?`
            );
            if (confirmUpdate) {
                try {
                    const updatedPerson = await personsService.update(duplicateName.id, { name: duplicateName.name, number: trimmedNumber });
                    setPersons((prevPersons) =>
                        prevPersons.map((person) =>
                            person.id === duplicateName.id ? updatedPerson : person
                        )
                    );
                    onPersonAdded(`Updated ${trimmedName}'s number`);
                    setNewName("");
                    setNewNumber("");
                } catch (error) {
                    const errMsg = error.response?.data?.error || error.message;
                    onPersonAdded(errMsg, true);
                }
            }
            return;
        }


        //If no duplicate, add new person
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
            const errMsg = error.response?.data?.error || error.message;
            // If resource was removed meanwhile
            if (error.response && error.response.status === 404) {
                onPersonAdded(`Information of ${trimmedName} has already been removed from server`, true);
                setPersons(persons.filter(p => p.name !== trimmedName));
            } else {
                onPersonAdded(errMsg, true);
            }
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