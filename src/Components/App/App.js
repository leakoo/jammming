import React, { useEffect, useState } from "react";
import './App.css';
import Playlist from "../Playlist/Playlist.js";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Track from "../Track/Track.js";
import Tracklist from "../TrackList/Tracklist.js";

function App() {
  return (
    <>
      <h1 className="title">
        <span>Ja</span>mmm<span>ing</span>
      </h1>
      <div className="app">
        <SearchBar />

        <div className="Results-Playlist-Container">
          <SearchResults />

          <Playlist />
        </div>
      </div>
    </>
  );
}

export default App;