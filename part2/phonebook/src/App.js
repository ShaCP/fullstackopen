import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Input from "./Input";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

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

  const displayNotif = (message, isError) => {
    setNotification({ message, isError: isError === true });
    setTimeout(() => setNotification({}), 5000);
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (!newName) return;

    //if person is already in phonebook
    const matchingPerson = persons.find(({ name }) => name === newName);
    const addNumber =
      !matchingPerson ||
      window.confirm(
        `${newName} already exists in the phonebook, replace the old number with a new one?`
      );

    if (!addNumber) return;

    if (matchingPerson) {
      updatePerson(matchingPerson);
    } else {
      const person = { name: newName, number: newNumber };
      personService.create(person).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
      });
      displayNotif(`Added ${newName}`);
    }
  };

  const updatePerson = (matchingPerson) => {
    personService
      .update(matchingPerson.id, { ...matchingPerson, number: newNumber })
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          )
        );
        setNewName("");
        setNewNumber("");
        displayNotif(`Updated ${newName}`);
      });
  };

  const removePerson = (name, id) => {
    if (window.confirm(`Remove ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          displayNotif(`Removed ${name}`);
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          displayNotif(
            `${name} had already been removed from the server`,
            true
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Input
        label="filter for"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  );
};

export default App;
