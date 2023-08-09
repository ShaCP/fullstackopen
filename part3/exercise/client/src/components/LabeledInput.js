import React from "react";

const LabeledInput = ({ label, value, onChange }) => (
  <div className="input-container">
    <label>
      {label}: <input value={value} onChange={onChange} />
    </label>
  </div>
);

export default LabeledInput;
