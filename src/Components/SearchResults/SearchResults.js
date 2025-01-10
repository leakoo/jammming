import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList.js";

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
