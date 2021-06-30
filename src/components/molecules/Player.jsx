import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import SpotifyPlayer from 'react-spotify-web-playback';

const StyledWrapper = styled.div`
   width:30%;
   margin-bottom:10px;
   margin: 0 auto;
`
const StyledPlayer = styled(SpotifyPlayer)`
    & > div {
        display: none;
    }
`

const Player = ({accessToken, trackUri}) => {
    const [play,setPlay] = useState(false);
    useEffect(() => setPlay(true),[trackUri])


    if(!accessToken) return null;
    return ( 
        <StyledWrapper>

               <StyledPlayer
                      token={accessToken}
                      showSaveLogo
                      callback={state => {
                          if(!state.isPlaying) setPlay(false)
                      }}
                      play={play}
                      showSaveIcon
                      uris={trackUri ? [trackUri] : []}
                      styles={{
                        color: '#00d1d1',
                         sliderColor: 'rgba(255,0,0,1)',
                         sliderHandleColor: 'rgba(255,0,0,1)',
                  }}
        />
        </StyledWrapper>
       
     );
}

export default Player;