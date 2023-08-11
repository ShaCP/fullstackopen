import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(
    () =>
      axios
        .get("https://restcountries.com/v3.1/all")
        .then(({ data }) => setCountries(data)),
    []
  );

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default App;
