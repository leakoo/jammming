import Track from "../track/track.jsx";
import './tracklist.css'

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
