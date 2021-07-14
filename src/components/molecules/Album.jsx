import React from 'react';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

const StyledWrapper = styled.div`
    display: flex;
   flex-direction: column;
   align-items:center;
   padding:25px;
   max-width:250px;
   background:white;
   border-radius:30px;
   box-shadow: 0px 15px 20px #b8b5b536;
   cursor:pointer;
   transition: all .4s;
   &:hover {
       transform:scale(1.05);
       box-shadow: 0px 15px 20px #b8b5b57d;
   }

`

const Album = ({album, onClick}) => {
    return ( 
        <StyledWrapper onClick={onClick}>
             <Logo medium src={album.image}/>
             <Paragraph style={{marginTop:"10px"}} thinSmall children={album.title}/>
             <Paragraph thinDesc children={album.release}/>
             <Paragraph thinDesc>{album.tracks} tracks</Paragraph>
        </StyledWrapper>
     );
}
 
export default Album;