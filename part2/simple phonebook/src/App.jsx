import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const personObject = {
      content: newName,
      id: String(persons.length + 1),
    };
    setPersons(persons.concat(personObject));
    setNewName("");
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {persons.length > 0 && (
        <button onClick={toggleShowAll}>
          {showAll ? "Hide all" : "Show All"}
        </button>
      )}
      <ul>
        {showAll && persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  );
};

export default App;
