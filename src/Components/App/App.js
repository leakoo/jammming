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
  ]);

  const [playlistName, setplaylistName] = useState('Playlist Name');
  const [playlistTracks, setplaylistTracks] = useState([
    {
      name: 'Song name-2',
      artist: 'Artist 2',
      album: 'Album 2',
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

          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
          />
        </div>
      </div>
    </>
  );
}

export default App;