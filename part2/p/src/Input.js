import React from 'react';

const Input = ({ label, value, onChange }) => (
    <div className="input-container">
        {label}: <input value={value} onChange={onChange} />
    </div>
);

export default Input;