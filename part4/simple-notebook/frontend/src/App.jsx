import { useEffect, useState } from "react";

import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   console.log("Updated persons list:", persons);
  // }, [persons]);
  const handleDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id);
    if (!personToDelete) {
      alert("Person not found");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
      personsService.remove(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id));
          alert(`Deleted ${personToDelete.name}`);
        })
        .catch(err => {
          alert(`Failed to delete ${personToDelete.name}`);
        });
    }
  };
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
      <Notification message={message} />
      <Notification message={error} type="error" />
      <Filter searchName={searchName} setSearchName={setSearchName} setShowAll={setShowAll} />
      <PersonForm persons={persons} setPersons={setPersons} onPersonAdded={showNotification} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
