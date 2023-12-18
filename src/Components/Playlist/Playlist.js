import React from "react";
import './Playlist.css';

function Playlist() {
    return (
      <div className="playlist">
        <input type="text" placeholder="Playlist Name"/>

        <button className="Playlist-save">
          Save To Spotify
        </button>
      </div>
    )
}

export default Playlist;