import "./SearchResult.css"
import React from 'react';
import { Link } from 'react-router-dom';

export const SearchResult = ({ result, city_id }) => {
  // Create the link URL based on the city_id and result.id
  const linkTo = `/selectshow/${city_id}/${result.id}`;

  return (
    <Link to={linkTo} className="search-result">
      {result.name}
    </Link>
  );
};
