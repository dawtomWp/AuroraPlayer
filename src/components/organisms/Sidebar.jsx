import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/icons/auroraLogo.png';
import Heading from '../atoms/Heading';
import Logo from '../atoms/Logo';
import Paragraph from '../atoms/Paragraph';
import {NavLink} from 'react-router-dom';
import Button from '../atoms/Button';

import {TiHome} from 'react-icons/ti';
import {GoSearch} from 'react-icons/go';
import {BsClock} from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';
import {BsPerson} from 'react-icons/bs';

import {RiAlbumLine} from 'react-icons/ri';
import {AiOutlinePlusCircle} from 'react-icons/ai'

const StyledWrapper = styled.div`
  display: flex;
  position:fixed;
  flex-direction: column;
  justify-content: space-evenly;
  width:350px;
  padding-bottom:25px;
  height:100%;
  background-color:#eaebeb96;
`
const LogoSection = styled.div`
  display: flex;
  top:20px;
  left:20px;
  position:absolute;
  align-items: center;

`
const MainNavSection = styled.nav`
  display: flex;
  flex-direction: column;
`
const LibrarySection= styled.div`
  display: flex;
  flex-direction: column;
`
const PlaylistSection= styled.div`
  display: flex;
  flex-direction: column;
`

const Sidebar = () => {
    return ( 
       <StyledWrapper>
           <LogoSection>
                 <Logo src={logo} smallLogo/>
                 <Heading sidebarTitle children="AURORA"/>
           </LogoSection>

           <MainNavSection>
                 <Paragraph navitem="true" as={NavLink} to="/"><span><TiHome/></span> Home</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/browser"><span><GoSearch/></span> Browse</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/placeholder"><span><GoSearch/></span> Placeholder</Paragraph>
           </MainNavSection>

           <LibrarySection>
                 <Paragraph navitem="true" as={NavLink} to="/recently"><span><BsClock/></span> recently</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/favourite"><span><AiOutlineHeart/></span> Favourite</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/artists"><span><BsPerson/></span> Artists</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/albums"><span><RiAlbumLine/></span> Albums</Paragraph>
           </LibrarySection>

           <PlaylistSection>
  
                 <Button normal><span><AiOutlinePlusCircle/></span>New Playlist</Button>
       
           </PlaylistSection>

      
     
       </StyledWrapper>
     );
}
 
export default Sidebar;