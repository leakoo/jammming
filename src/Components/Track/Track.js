import React, { useCallback } from "react";
import "./Track.css";

function Track(props) {
  const addTrack = useCallback(
    (e) => {
      props.onAdd(props.track);
    },
    [props]
  );

  const removeTrack = useCallback(
    (e) => {
      props.onRemove(props.track);
    },
    [props]
  );

  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className="trackAction" onClick={removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="trackAction" onClick={addTrack}>
          +
        </button>
      );
    }
  };

  return (
    <div className="track">
      <img className="albumImage" src={props.track.albumImage} alt="album"/>
      <div className="trackInfo">
        <h3>{props.track.name}</h3>
        <div className="song-detail">
          <p>
            {props.track.artist} | {props.track.album}
          </p>
          <p className="addToPlaylist">{renderAction()}</p>
        </div>
      </div>
    </div>
  );
}

export default Track;
