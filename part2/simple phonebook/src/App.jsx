import { useEffect, useState } from "react";

import AddName from "./components/AddName";
import FilterName from "./components/FilterName";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  useEffect(() => {
    console.log("Updated persons list:", persons);
  }, [persons]);


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterName persons={persons} />
      <AddName persons={persons} setPersons={setPersons} />
      
    </div>
  );
};

export default App;
