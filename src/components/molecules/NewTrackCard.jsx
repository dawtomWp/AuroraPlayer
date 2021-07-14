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
    margin: 0 auto;
    box-shadow: 0px 15px 20px #b8b5b5;
    transition: all .4s;

    cursor:pointer;
    & > h2 {
        color:white;
        z-index:1;
    }
    & > p {
        position: absolute;
        bottom:5%;
        font-weight:bold;
        display:flex;
        flex-direction: column;
       color:${({theme})=> theme.text};
       z-index:1;
       align-items:flex-start;
       &:last-of-type{
           position:absolute;
           bottom:5%;
           right:5%;
        }

       & > span {
           color:white;
       }
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

const NewTrackCard = ({newTrack, onClick, album}) => {
    return ( 
        <StyledWrapper album={album} onClick={onClick} style={{backgroundImage:`url(${newTrack.image})`}}>
            <h2>{newTrack.title}</h2>
     
               <p>Artist<span>{newTrack.artist}</span></p>
               <p>Release <span>{newTrack.release}</span></p>

            <InnerShadow/>
          
       
            
        </StyledWrapper>
     );
}
 
export default NewTrackCard;