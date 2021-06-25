import React from 'react';

const TrackSearchResult = ({track, chooseTrack}) => {

    function handlePlay () {
      chooseTrack(track)
    }
    const convertDurationUnit = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0); 

        return `${minutes}:${seconds < 10 ?  '0' + seconds : seconds}`
    }

    console.log(track)
    return (
    <div onClick = {handlePlay}>
          <img src={track.albumUrl} style={{height: "64px", width: '64px'}} alt="song poster"  />
          <div>
              <p>{track.title}</p>
              <p>{track.artist}</p>
              <p>{convertDurationUnit(track.duration)}</p>
              <p>{track.release}</p>
              <p>{track.albumName === track.title ? "Single": track.albumName}</p>
          </div>
    </div> 
    
    );
}
 
export default TrackSearchResult;