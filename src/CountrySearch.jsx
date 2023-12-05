import React, { useState, useEffect } from 'react';
import './style.css';

const CountrySearch = () => {
  const [currencyCode, setCurrencyCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchCountriesByCurrency = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currencyCode) {
      searchCountriesByCurrency();
    }
  }, [currencyCode]);

  return (
    <div className="container">
      <h1>Country Search by Currency</h1>
      <div>
        <label htmlFor="currencyInput">Enter Currency Code: </label>
        <input
          type="text"
          id="currencyInput"
          value={currencyCode}
          onChange={(e) => setCurrencyCode(e.target.value)}
        />
        <button onClick={searchCountriesByCurrency} disabled={loading}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {countries.length > 0 && (
        <div>
          <h2>Countries associated with {currencyCode}:</h2>
          <ul>
            {countries.map((country) => (
              <li key={country.name.common} className="country-item">
                <img
                  className="country-flag"
                  src={`https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`}
                  alt={`${country.name.common} Flag`}
                />
                {country.name.common}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
