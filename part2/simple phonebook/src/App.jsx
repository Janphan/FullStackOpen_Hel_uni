import { useEffect, useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addName = (event) => {
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

  const handleSearch = (event) => {
    console.log("search", event.target.value);
    setSearchName(event.target.value);
    setShowAll(false);
  }

  useEffect(() => {
    console.log("Updated persons list:", persons);
  }, [persons]);

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())) //equal to what here
  return (
    <div>
      <h2>Phonebook</h2>
      <form>Filter Name with a<input value={searchName} onChange={handleSearch} /></form>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* {persons.length > 0 && (
        <button onClick={toggleShowAll}>
          {showAll ? "Hide all" : "Show All"}
        </button>
      )} */}
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
