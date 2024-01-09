import React, { useState } from "react";
import './App.css';
import Playlist from "../Playlist/Playlist.js";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";

function App() {
  const [searchResults, setsearchResults] = useState([
    {
      name: 'Song name-1',
      artist: 'Artist 1',
      album: 'Album 1',
      id: 1,
    },
    {
      name: 'Song name-2',
      artist: 'Artist 2',
      album: 'Album 2',
      id: 2,
    },
    {
      name: 'Song name-3',
      artist: 'Artist 3',
      album: 'Album 3',
      id: 3,
    }
  ]);
  return (
    <>
      <h1 className="title">
        <span>Ja</span>mmm<span>ing</span>
      </h1>
      <div className="app">
        <SearchBar />

        <div className="Results-Playlist-Container">
          <SearchResults searchResults={searchResults} />

          <Playlist />
        </div>
      </div>
    </>
  );
}

export default App;