import React from "react";

export const Filter = ({ filter, setFilter }) => (
  <div>
    Find countries:{" "}
    <input value={filter} onChange={(e) => setFilter(e.target.value)} />
  </div>
);

export default Filter;
