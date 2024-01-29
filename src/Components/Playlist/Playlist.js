import React, { useCallback } from "react";
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

function Playlist(props) {

  const handleNameChange = useCallback(
    (e) => {
      props.onNameChange(e.target.value)
    }, 
    [props.onNameChange]
  )

  return (
    <div className="playlist">
      <input onChange={handleNameChange} type="text" placeholder="Playlist Name"/>

      <TrackList 
        tracks={props.playlistTracks} 
        onRemove={props.onRemove}
        isRemoval={true}
      />

      <button className="Playlist-save">
        Save To Spotify
      </button>
    </div>
  )
}

export default Playlist;