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
    [props]
  );

  const handleClick = () => {
    if (props.playlistTracks.length === 0) {
      alert('Your playlist is empty. Please add some songs before saving.');
      return;
    };
    props.onSave();
    setPlaylistNameInput("");
  };

  return (
    <div className="playlistContainer">
      <div className="playlistInputContainer">
        <input
          onChange={handleNameChange}
          value={playlistNameInput}
          type="text"
          placeholder="Enter Playlist Name"
          required
        />
      </div>

      <TrackList
        tracks={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <div className="saveButtonContainer">
        <button onClick={handleClick} className="saveButton">
          Save To Spotify
        </button>
      </div>
    </div>
  );
}

export default Playlist;