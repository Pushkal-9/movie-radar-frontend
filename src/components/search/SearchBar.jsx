import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"
import React from 'react';


export const SearchBar = ({ setResults, city_id }) => {
  const [input, setInput] = useState([]);
  console.log("Trying city id: "+city_id)

  var url = 'http://localhost:8080/search/movies?city_id='+city_id
  console.log(url)
  const fetchData = (value) => {
    fetch(url,{
        method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((movie) => {
          return (
            value &&
            movie &&
            movie.name &&
            movie.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search a movie..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};