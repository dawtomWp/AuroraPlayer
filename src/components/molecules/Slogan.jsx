import React from 'react';
import styled from 'styled-components';
import Paragraph from '../atoms/Paragraph';
import {motion} from 'framer-motion'

const StyledWrapper = styled.div`

`

const Slogan = () => {
    return ( 
        <StyledWrapper>

        <Paragraph 
          as={motion.div} 
          initial={{opacity:0, scale:1.2}}
          transition={{delay:.6, duration:.6}}
          animate={{ scale: 1, opacity:1 }}
          children="Sign in with Spotify"/>
        <Paragraph 
           thinParagraph
           as={motion.div} 
           initial={{opacity:0}}
           transition={{delay:1.3, duration:.6}}
           animate={{ scale: 0.8, opacity:1 }}
           children="Drift into The Music"
        />
          

        </StyledWrapper>
     );
}
 
export default Slogan;