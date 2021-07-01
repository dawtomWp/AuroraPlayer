import React from 'react';
import { useConverter } from '../../hooks/useConverter';
import { useDateFormat } from '../../hooks/useDateFormat';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import Paragraph from '../atoms/Paragraph';
import {BsClock} from 'react-icons/bs';
import {RiAlbumLine} from 'react-icons/ri';


const Track = styled.div`
  display: flex;
  cursor:pointer;
  justify-content:space-between;
  margin: 8px 25px 8px 0;
  padding:5px;
  transition: background .5s;
  &:hover {
    background: white;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-self: flex-start;

    & > img {
      margin-right:12px;
    }
  }
`
const TimeInfo = styled.div`
   display: flex;
   flex-direction: column !important;
   align-items: flex-end;
   justify-content: center;

   & >p > span{
     margin-right:5px;
     font-size:10px;
   }
     
`

const TrackSearchResult = ({track, chooseTrack}) => {
    
    const isConvert = useConverter(track.duration)
    const isDataFormatted = useDateFormat(track.played)

    function handlePlay () {
      chooseTrack(track)
    }

    return (
    <Track onClick = {handlePlay}>
                   
          <div>
            <Logo small src={track.albumUrl} alt="song poster"/>

             <div>
                <p children={track.title}/>
                <Paragraph thinSmall children={track.albumName === track.title ? "Single": track.albumName}/>
                <Paragraph thinDesc children={track.artist}/>
 
             </div>
          
      
          

          </div>
          <TimeInfo>
            <Paragraph thinSmall><span><BsClock/></span>{isConvert}</Paragraph>
            <Paragraph thinSmall><span><RiAlbumLine/></span>{track.release}</Paragraph>
            <Paragraph thinDesc>{isDataFormatted}</Paragraph>
          </TimeInfo>
    </Track> 
    
    );
}
 
export default TrackSearchResult;