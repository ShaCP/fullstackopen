import React from 'react';

export const Filter = ({ filterFor, setFilterFor }) => (
  <div>
    Find countries:{' '}
    <input value={filterFor} onChange={(e) => setFilterFor(e.target.value)} />
  </div>
);

export default Filter;