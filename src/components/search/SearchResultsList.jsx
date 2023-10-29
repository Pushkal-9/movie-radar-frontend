import { SearchResult } from "../search/SearchResult";
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

export const SearchResultsList = ({ results, city_id }) => {
  return (
    <div className="results-list">
      {results.map((result) => {
        const linkTo = `/selectshow/${city_id}/${result.id}`;
        return (
          <Link to={linkTo} key={result.id} className="search-result">
            {result.name}
          </Link>
        );
      })}
    </div>
  );
};