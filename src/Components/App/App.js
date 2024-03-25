import React, { useState, useCallback } from "react";
import "./App.css";
import Playlist from "../Playlist/Playlist.js";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Spotify from "../../Util/Spotify.js";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
        console.log("Adding track to playlist:", track);
        return;
      }
      console.log("Adding track to playlist:", track);
      setPlaylistTracks((lastTrack) => [...lastTrack, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    console.log("Removing track from playlist", track);
    setPlaylistTracks((playlistTrack) =>
      playlistTrack.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const renamePlaylist = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.saveUserPlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("Playlist Name");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  const search = useCallback((term) => {
    Spotify.getAccessToken().then(() => {
      Spotify.search(term).then(setSearchResults);
    });
  }, []);

  return (
    <>
      <h1 className="title">
        <span>Ja</span>mmm<span>ing</span>
      </h1>
      <div className="app">
        <SearchBar onSearch={search} />

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
