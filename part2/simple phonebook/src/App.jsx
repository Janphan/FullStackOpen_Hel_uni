import { useEffect, useState } from "react";

import AddName from "./components/AddName";
import FilterName from "./components/FilterName";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);
  useEffect(() => {
    console.log("Updated persons list:", persons);
  }, [persons]);

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())) //equal to what here
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterName searchName={searchName} setSearchName={setSearchName} />
      <AddName persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <PersonsList persons={personsToShow} />
    </div>
  );
};

export default App;
