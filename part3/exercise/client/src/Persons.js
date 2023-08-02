import React from 'react';

const Person = ({ person: { name, number }, deletePerson }) => (
  <li key={name} className="person">
    {name} {number} <button onClick={deletePerson}>delete</button>
  </li>
);

const Persons = ({ persons, filterFor, deletePerson }) => {
  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filterFor.toLowerCase())
  );

  const filteredPersonsList = filteredPersons.map((person) => (
    <Person
      key={person.id}
      person={person}
      deletePerson={() => deletePerson(person.name, person.id)}
    />
  ));

  return (
    <div className="persons">
      <ul className="persons-list">{filteredPersonsList}</ul>
    </div>
  );
};

export default Persons;
