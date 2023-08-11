import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    isError: false
  });

  useEffect(
    () =>
      personService
        .getAll()
        .then((initialPersons) => setPersons(initialPersons)),
    []
  );

  const displayNotif = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification({ message: null, isError: false }), 5000);
  };

  const cleanForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (!newName || !newNumber)
      return displayNotif("Complete the entry data", true);

    //if person is already in phonebook
    const matchingPerson = persons.find(({ name }) => name === newName);

    if (matchingPerson) {
      const updateNumber = window.confirm(
        `${newName} already exists in the phonebook, replace the old number with a new one?`
      );
      if (updateNumber) {
        updatePerson(matchingPerson);
      }

      return;
    } else {
      const person = { name: newName, number: newNumber };
      personService
        .create(person)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          cleanForm();
          displayNotif(`Added ${newName}`);
        })
        .catch((error) => {
          console.error(error.response.data.error);
          displayNotif(error.response.data.error, true);
        });
    }
  };

  const updatePerson = ({ id }) => {
    personService.update(id, newNumber).then((updatedPerson) => {
      setPersons(
        persons.map((person) =>
          person.id !== updatedPerson.id ? person : updatedPerson
        )
      );
      cleanForm();
      displayNotif(`Updated ${newName}'s number`);
    });
  };

  const removePerson = (name, id) => {
    const removePerson = window.confirm(`Remove ${name}?`);
    if (removePerson) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          displayNotif(`Removed ${name}`);
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          displayNotif(`${name} had already been removed`, true);
        });
    }
  };

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new entry</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
