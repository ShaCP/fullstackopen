import React from "react";

const Person = ({ person: { name, number }, removePerson }) => (
  <li key={name} className="person">
    {name} {number} <button onClick={removePerson}>remove</button>
  </li>
);

export default Person;
