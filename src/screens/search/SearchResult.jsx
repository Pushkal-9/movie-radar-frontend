import { Link } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result, city_id }) => {

  return (
    <Link
      className="search-result"
      to='/selectshow/${city_id}/${result.id}'
    >
      {result.name}
    </Link>
  );
};