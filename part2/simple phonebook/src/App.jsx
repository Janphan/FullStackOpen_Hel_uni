import { useEffect, useState } from "react";

import AddName from "./components/AddName";
import FilterName from "./components/FilterName";
import PersonsList from "./components/PersonsList";
import NotificationMessage from "./components/NotificationMessage";
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   console.log("Updated persons list:", persons);
  // }, [persons]);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        if (Array.isArray(initialPersons)) {
          setPersons(initialPersons);
          return;
        }
        throw new Error("API did not return an array of persons");
      })
      .catch(err => {
        setError("Failed to fetch data from server");
        setTimeout(() => setError(null), 3000);
      });
  }, []);
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())) //equal to what here

  const showNotification = (message, isError = false) => {
    if (isError) {
      setError(message);
    } else {
      setMessage(message);
    }
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage message={message} />
      <FilterName searchName={searchName} setSearchName={setSearchName} setShowAll={setShowAll} />
      <AddName persons={persons} setPersons={setPersons} onPersonAdded={showNotification} />
      <h2>Numbers</h2>
      <PersonsList persons={personsToShow}
        setPersons={setPersons}
        onDelete={(name) => showNotification(`Deleted ${name}`)}
        onError={(errMsg) => showNotification(errMsg, true)}
      />
    </div>
  );
};

export default App;
