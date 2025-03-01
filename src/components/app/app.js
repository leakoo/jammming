import React, { useState, useCallback } from "react";
import "./app.css";
import Playlist from "../playlist/playlist.js";
import SearchBar from "../search-bar/search-bar.js";
import SearchResults from "../search-results/search-results.js";
import Spotify from "../../util/spotify.js";

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

  const isTrackInPlaylist = useCallback(
    (track) => playlistTracks.some((savedTrack) => savedTrack.id === track.id),
    [playlistTracks]
  );

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
        Ja<span>mmm</span>ing
      </h1>
      <div>
        <SearchBar onSearch={search} />

        <div>
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} 
            onRemove={removeTrack}
            isTrackInPlaylist={isTrackInPlaylist}
          />

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
