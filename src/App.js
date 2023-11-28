import React, { useEffect, useState } from "react";
import './Styles/App.css'
import Playlist from "./Components/Playlist";
import SearchBar from "./Components/SearchBar";
import SearchResults from "./Components/SearchResults";
import Track from "./Components/Track";
import Tracklist from "./Components/Tracklist";

function App() {
  return (
    <div className="app">
      <h1 className="title">Jammming</h1>
      <SearchBar />
    </div>
  );
}

export default App;