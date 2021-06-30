import React from 'react';
import { useConverter } from '../../hooks/useConverter';
import styled from 'styled-components';
import Paragraph from '../atoms/Paragraph';
import Logo from '../atoms/Logo';
import Heading from '../atoms/Heading';
import {BsClock} from 'react-icons/bs';


const StyledWrapper = styled.div`
     width:35%;

     & > h1 {
         font-size:20px;
         margin-bottom:30px;
     }

`

const StyledInnerWrapper = styled.div`
   display: flex;
   position:relative;
   height:220px;
   margin-right:auto;
   padding:20px;
   background:white;
   border-radius: 30px;
   box-shadow: 0px 15px 20px #b8b5b536;
   cursor:pointer;
   transition: all .4s;
   & > div {
       margin-left:8px;
   }
   &:hover {
       transform:scale(1.05);
       box-shadow: 0px 15px 20px #b8b5b57d;
   }

`
const StyledInfo = styled.div `
       position:absolute;
       bottom:5%;
       right:5%;
       text-align:right;
`

const DurationInfo = styled.div`
   display:flex;
   position:absolute;
   left: 5%;
   bottom:5%;
   align-items:center;
   justify-content: center;
   & > p {
       font-size:20px;
       margin-left:5px;
   }
   & > span {
       margin-top:8px;
   }

`


const BestResult = ({bestResult, chooseTrack}) => {
    const isConvert = useConverter(bestResult.duration)


    const handlePlay = () => chooseTrack(bestResult)

    return ( 
        <StyledWrapper>
             <Heading sectionTitle children="Best Result"/>
        <StyledInnerWrapper onClick={handlePlay}>
              <Logo medium bigger src={bestResult.albumUrl} alt="song poster"/>
              <div>
                  <Heading sectionTitle children={bestResult.title}/>
                  <p children={bestResult.artist}/>
              </div>
              <StyledInfo>
                     <Paragraph thinSmall children={bestResult.albumName === bestResult.title ? "Single": bestResult.albumName}/>
                     <Paragraph thinSmall>{bestResult.release}</Paragraph>
              </StyledInfo>
              <DurationInfo>
                   <span><BsClock/></span>
                   <Paragraph thinSmall> {isConvert}</Paragraph>
              </DurationInfo>
           
            
                
           
        </StyledInnerWrapper>
        </StyledWrapper>
     );
}
 
export default BestResult;