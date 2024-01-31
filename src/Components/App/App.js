import React, { useState, useCallback} from "react";
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

  const addTrack = useCallback(
    (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id))
      return;
    setplaylistTracks((lastTrack) => [...lastTrack, track]);
    },
    [playlistTracks]
  ); 

  const removeTrack = useCallback((track) => {
      setplaylistTracks((playlistTrack) =>
        playlistTrack.filter((currentTrack) => currentTrack.id !== track.id)
      );
    },
    []
  );

  const renamePlaylist = useCallback((name) => {
    setplaylistName(name);
    },
    []
  );

  const savePlaylist = useCallback(() => {
    const trackURI = playlistTracks.map((track) => track.uri);
    },
    [playlistTracks]
  );

  return (
    <>
      <h1 className="title">
        <span>Ja</span>mmm<span>ing</span>
      </h1>
      <div className="app">
        <SearchBar />

        <div className="Results-Playlist-Container">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />

          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={renamePlaylist}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </>
  );
}

export default App;