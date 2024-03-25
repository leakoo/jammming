import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList.js";

function SearchResults(props) {
  return (
    <div className="SearchResults">
      <h2 className="results-header">Results</h2>

      <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
    </div>
  );
}

export default SearchResults;
