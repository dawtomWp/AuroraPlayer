import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({accessToken, trackUri}) => {

    if(!accessToken) return null;
    return ( 
        <SpotifyPlayer
           token={accessToken}
           showSaveLogo
         //   autoPlay
           uris={trackUri ? [trackUri] : []}
        />
     );
}
 
export default Player;