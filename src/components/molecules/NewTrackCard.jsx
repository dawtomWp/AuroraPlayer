import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div `
     display:flex;
     flex-direction:column;
    position:relative;
    width:650px;
    height:320px;
    border-radius:30px;
    background-repeat:no-repeat;
    background-size:cover;
    padding:30px;
    box-shadow: 0px 15px 20px #b8b5b5;
    transition: all .4s;
    cursor:pointer;
    & > p {
        display:block;
       color:white;
       z-index:1;
   }
   &:hover {
       transform:scale(1.04);
       box-shadow: 0px 15px 30px 3px #a5a1a1;
   }

`
const InnerShadow = styled.div`
   position:absolute;
   border-radius:30px;
   width:100%;
   height:100%;
   top:0;
   left:0%;
   background: ${({theme})=>theme.buttonPrimary};
   opacity:.6;
`

const NewTrackCard = ({newTrack}) => {
    return ( 
        <StyledWrapper style={{backgroundImage:`url(${newTrack.image})`}}>
            <p><span>Album </span> {newTrack.name}</p>
            <p><span>Artist </span>{newTrack.artist}</p>
            <p>Release date {newTrack.date}</p>
            <InnerShadow/>
          
       
            
        </StyledWrapper>
     );
}
 
export default NewTrackCard;