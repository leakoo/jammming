import React, { useCallback, useState } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList.js";

function Playlist(props) {
  const [playlistNameInput, setPlaylistNameInput] = useState(
    props.playlistName
  );
  
  const handleNameChange = useCallback(
    (e) => {
      setPlaylistNameInput(e.target.value);
      props.onNameChange(e.target.value);
    },
    [props.onNameChange]
  );

  const handleClick = () => {
    props.onSave();
    setPlaylistNameInput("");
  };

  return (
    <div className="playlist">
      <input
        onChange={handleNameChange}
        value={playlistNameInput}
        type="text"
        placeholder="Playlist Name"
        required
      />

      <TrackList
        tracks={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />

      <button onClick={handleClick} className="playlist-save">
        Save To Spotify
      </button>
    </div>
  );
}

export default Playlist;
