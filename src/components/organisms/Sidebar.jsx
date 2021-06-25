import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/icons/auroraLogo.png';
import Heading from '../atoms/Heading';
import Logo from '../atoms/Logo';
import Paragraph from '../atoms/Paragraph';

import {TiHome} from 'react-icons/ti';
import {GoSearch} from 'react-icons/go';

const StyledWrapper = styled.div`

`
const LogoSection = styled.div`
  display: flex;
  align-items: center;
`
const MainNavSection = styled.nav``

const Sidebar = () => {
    return ( 
       <StyledWrapper>
           <LogoSection>
                 <Logo src={logo} small/>
                 <Heading sidebarTitle children="Aurora"/>
           </LogoSection>

           <MainNavSection>
                 <Paragraph><span><TiHome/></span> Home</Paragraph>
                 <Paragraph><span><GoSearch/></span> Browse</Paragraph>
                 <Paragraph><span><GoSearch/></span> Placeholder</Paragraph>
           </MainNavSection>
     
       </StyledWrapper>
     );
}
 
export default Sidebar;