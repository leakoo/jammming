import React, { useCallback, useState } from "react";
import "./Track.css";

function Track(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  const addTrack = useCallback(
    (e) => {
      props.onAdd(props.track);
    },
    [props.onAdd, props.track]
  );

  const removeTrack = useCallback(
    (e) => {
      props.onRemove(props.track);
    },
    [props.onRemove, props.track]
  );

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={addTrack}>
          +
        </button>
      );
    }
  };

  return (
    <div className="Track">
      <div className="Track-Info">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderAction()}

      {/*<button onClick={togglePlay} className="previewButton">
        {isPlaying ? "Pause" : "Play"}
      </button>

      {isPlaying && (
        <audio ref={audioRef} className="customAudio" controls>
          <source src={props.track.previewUrl} type="audio/mpeg" />
        </audio>
      )}
      */}
    </div>
  );
}

export default Track;
