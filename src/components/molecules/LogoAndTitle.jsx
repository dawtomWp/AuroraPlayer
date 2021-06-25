import React from 'react';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import Heading from '../atoms/Heading';
import LogoImg from '../../assets/icons/auroraLogo.png';

const StyledWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items:center;
   justify-content: center;
`

const LogoAndTitle = () => {
    return ( 
        <StyledWrapper>  
              <Logo src={LogoImg}/>
              <Heading children="Aurora Player"/>
        </StyledWrapper>
     );
}
 
export default LogoAndTitle;