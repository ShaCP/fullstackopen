import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterFor, setFilterFor] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(({ data }) => {
      setCountries(data);
    });
  }, []);

  return (
    <div>
      <Filter filterFor={filterFor} setFilterFor={setFilterFor} />
      <Countries countries={countries} filterFor={filterFor} />
    </div>
  );
};

export default App;
