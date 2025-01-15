import React from "react";
import Track from "../Track/Track.js";
import './TrackList.css'

function TrackList(props) {
  return (
    <div className="trackList">
      {props.tracks.map((track) => {
        return (
          <Track
            key={track.id}
            track={track}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            isRemoval={props.isTrackInPlaylist ? props.isTrackInPlaylist(track) : props.isRemoval}
          />
        );
      })}
    </div>
  );
}

export default TrackList;
