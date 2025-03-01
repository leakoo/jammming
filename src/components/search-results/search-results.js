import React from "react";
import "./search-results.css";
import TrackList from "../tracklist/tracklist.js";

function SearchResults(props) {
  return (
    <>
    <h2 className="resultsHeader">Results</h2>

    <TrackList 
      tracks={props.searchResults} 
      onAdd={props.onAdd} 
      onRemove={props.onRemove}
      isTrackInPlaylist={props.isTrackInPlaylist}
      />
    </>
  );
}

export default SearchResults;
