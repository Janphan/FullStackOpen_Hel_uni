import { useEffect, useState } from "react";
import Person from "./components/Person";
import AddName from "./components/AddName";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);

  

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
      <AddName persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>

      <ul>
        {personsToShow.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
