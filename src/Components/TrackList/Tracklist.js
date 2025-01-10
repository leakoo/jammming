import React from "react";
import Track from "../Track/Track.js";

function TrackList(props) {
  return (
    <div>
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
