import React from 'react';
import styled from 'styled-components';
import { useNumFormatter } from '../../hooks/useNumFormatter';
import Logo from '../atoms/Logo';
import Paragraph from '../atoms/Paragraph';

const StyledWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items:center;
   padding:25px;
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

const ArtistsResult = ({artists, onClick}) => {

    

    const isFormatted = useNumFormatter(artists.followers)

    return ( 
        <StyledWrapper onClick={onClick}>
            <Logo  medium src={artists.artistAvatar}/>
            <Paragraph thinSmall children={artists.name}/>
            <Paragraph thinDesc>{isFormatted ? isFormatted + " Followers" : null}</Paragraph>
        </StyledWrapper>
     );
}
 
export default ArtistsResult;