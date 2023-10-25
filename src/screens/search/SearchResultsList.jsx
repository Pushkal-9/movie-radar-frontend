import { Router,Route,Link, BrowserRouter } from "react-router-dom";
import { SearchResult } from "../search/SearchResult";
import SelectShow from "./SelectShow.jsx";

export const SearchResultsList = ({ results, city_id }) => {
  return (
    <div>
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />
      })}
    </div>
    
    </div>
  );
};