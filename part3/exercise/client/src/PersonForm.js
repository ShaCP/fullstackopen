import React from 'react';
import Input from './Input';

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => (
  <div className="form-container">
    <form className="person-form" onSubmit={addPerson}>
      <Input
        label="name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Input
        label="phone number"
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
);

export default PersonForm;
