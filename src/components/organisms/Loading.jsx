import React from 'react';
import styled from 'styled-components';
import {motion, AnimatePresence} from "framer-motion"
import Paragraph from '../atoms/Paragraph';
import ReactLoading from 'react-loading';

const StyledWrapper = styled.div`
   display: flex;
   flex-direction: column;
   background: #dddddd;
   position:absolute;
   top:0;
   left:0;
   width:100vw;
   align-items:center;
   justify-content: center;
   min-height:100vh;
   z-index:999;
`

const Loading = ({isVisible}) => {

    console.log(isVisible)
    return ( 
        <>
        <AnimatePresence exitBeforeEnter>
            {isVisible && (
                     <StyledWrapper
                        as={motion.div}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{delay:3}}
                     >
 
                     <ReactLoading type={"bars"} color={"rgba(255,0,0,1)"} height={150} width={150} />
                     <Paragraph boldParagraph children="Loading"/>

                    </StyledWrapper>

            )}
             
        </AnimatePresence>
        </>
 
     );
}
 
export default Loading;