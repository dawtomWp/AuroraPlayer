import React from 'react';
import styled from 'styled-components';
import Button  from '../atoms/Button';
import {RiSpotifyLine} from 'react-icons/ri';
import LogoAndTitle from '../molecules/LogoAndTitle';
import Slogan from '../molecules/Slogan';
import { motion } from 'framer-motion';




const StyledWrapper = styled.div`
  display:flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width:315px;
  height:550px;
  background-color: #ffffff;
  padding:20px;
  box-shadow: 0px 3px 15px 1px #484848;
  overflow:hidden;

  @media (min-width:481px) {
      width:450px;
  }
`

const LoginForm = ({url, help}) => {
    return ( 
        <StyledWrapper
             as={motion.div}
             initial={{y:-700}}
             animate={{y:0}}
             transition={{duration:.5}}
        >
              <LogoAndTitle/>  
              <Slogan/>
              <Button href={url}> Login <span><RiSpotifyLine/></span></Button>
              <Button 
                 href={help}
                 secondary
                 target="_blank"
                 as={motion.a}
                 initial={{y:200}}
                 transition={{delay:1.7, duration:.6}}
                 animate={{ y:5 }}
                 children="Help"
              />
         </StyledWrapper>

     );
}
 
export default LoginForm;