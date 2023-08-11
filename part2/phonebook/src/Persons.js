import React from "react";

const Person = ({ person: { name, number }, removePerson }) => (
  <li key={name} className="person">
    {name} {number} <button onClick={removePerson}>remove</button>
  </li>
);

const Persons = ({ persons, filter, removePerson }) => {
  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredPersonsList = filteredPersons.map((person) => (
    <Person
      key={person.id}
      person={person}
      removePerson={() => removePerson(person.name, person.id)}
    />
  ));

  return (
    <div className="persons">
      <ul className="persons-list">{filteredPersonsList}</ul>
    </div>
  );
};

export default Persons;
