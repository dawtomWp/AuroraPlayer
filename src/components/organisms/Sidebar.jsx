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
  position:absolute;
  flex-direction: column;
  justify-content: space-around;
  width:350px;
  padding-top:100px;
  padding-bottom:25px;
  height:885px;
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
                 <Logo src={logo} small/>
                 <Heading sidebarTitle children="AURORA"/>
           </LogoSection>

           <MainNavSection>
                 <Paragraph navitem="true" as={NavLink} to="/"><span><TiHome/></span> Home</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/browser"><span><GoSearch/></span> Browse</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/placeholder"><span><GoSearch/></span> Placeholder</Paragraph>
           </MainNavSection>

           <LibrarySection>
                 <Paragraph navitem="true" as={NavLink} to="/recently"><span><BsClock/></span> recently played</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/favourite"><span><AiOutlineHeart/></span> Favourite songs</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/artists"><span><BsPerson/></span> Artists</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/albums"><span><RiAlbumLine/></span> Albums</Paragraph>
           </LibrarySection>

           <PlaylistSection>
                 <Paragraph navitem="true" as={NavLink} to="/top50">top 50</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/top100"> Favourite</Paragraph>
                 <Paragraph navitem="true" as={NavLink} to="/top150">Romance</Paragraph>
           </PlaylistSection>

           <Button normal><span><AiOutlinePlusCircle/></span>New Playlist</Button>
     
       </StyledWrapper>
     );
}
 
export default Sidebar;