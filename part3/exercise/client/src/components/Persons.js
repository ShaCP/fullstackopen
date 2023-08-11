import React from "react";
import Person from "./Person";

const Persons = ({ persons, removePerson }) => {
  return (
    <div className="persons">
      <ul className="persons-list">
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            removePerson={() => removePerson(person.name, person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
