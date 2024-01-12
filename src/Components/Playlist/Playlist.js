import React from "react";
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

function Playlist(props) {
    return (
      <div className="playlist">
        <input type="text" placeholder="Playlist Name"/>

        <TrackList tracks={props.playlistTracks}/>

        <button className="Playlist-save">
          Save To Spotify
        </button>
      </div>
    )
}

export default Playlist;