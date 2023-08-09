import React from "react";
import LabeledInput from "./LabeledInput";

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  setNewName,
  setNewNumber
}) => (
  <div className="form-container">
    <form className="person-form" onSubmit={addPerson}>
      <LabeledInput
        label="name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <LabeledInput
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
