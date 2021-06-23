import React from 'react';

const TrackSearchResult = ({track, currentTrack}) => {

    const handlePlay = () => {
       currentTrack(track)
    }
    return (
    <div onClick = {handlePlay}>
          <img src={track.albumUrl} style={{height: "64px", width: '64px'}} alt="song poster"  />
          <div>
              <p>{track.title}</p>
              <p>{track.artist}</p>
          </div>
    </div> 
    
    );
}
 
export default TrackSearchResult;