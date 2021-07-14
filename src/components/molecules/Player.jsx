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

const Player = ({access,api, trackUri}) => {
    const [play,setPlay] = useState(false);
    useEffect(() => setPlay(true),[trackUri])

    const repeatTrack = () => {
        console.log(trackUri)
        api.play()
        .then(function () {
            console.log('Repeat track.');
         }, function(err) {
            console.log('Something went wrong!', err);
       });


    }




    if(!access) return null;
    return ( 
        <StyledWrapper>

               <StyledPlayer
                      token={access}
                      showSaveLogo
                      previousTracks
                      magnifySliderOnHover
                      callback={state => {
                          if(!state.isPlaying) setPlay(false)
                      }}
                      play={play}
                      uris={trackUri ? [trackUri] : []}
                      styles={{
                        color: '#00d1d1',
                         sliderColor: 'rgba(255,0,0,1)',
                         sliderHandleColor: 'rgba(255,0,0,1)',
                  }}
        />
        {/* <button onClick={repeatTrack}>rejpit</button> */}
        </StyledWrapper>
       
     );
}

export default Player;