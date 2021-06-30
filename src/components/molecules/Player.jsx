import React from 'react';
import styled from 'styled-components';
import SpotifyPlayer from 'react-spotify-web-playback';

const StyledWrapper = styled.div`
   width:50%;
   margin-bottom:10px;
   margin-left:450px;
`
const StyledPlayer = styled(SpotifyPlayer)`
    & > div {
        display: none;
    }
`

const Player = ({accessToken, trackUri}) => {

    if(!accessToken) return null;
    return ( 
        <StyledWrapper>

               <StyledPlayer
            token={accessToken}
            showSaveLogo
            autoPlay={true}
            showSaveIcon
            uris={trackUri ? [trackUri] : []}
            styles={{
               // activeColor: '#fff',
               color: '#00d1d1',
               // loaderColor: '#fff',
               sliderColor: 'rgba(255,0,0,1)',
               sliderHandleColor: 'rgba(255,0,0,1)',

               // trackArtistColor: '#ccc',
               // trackNameColor: '#fff',
             }}
        />
        </StyledWrapper>
       
     );
}

export default Player;