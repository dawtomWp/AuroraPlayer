import React,{useState,useEffect} from 'react';
import Paragraph from '../atoms/Paragraph';
import Logo from '../atoms/Logo';
import styled from 'styled-components';
import {BsPerson} from 'react-icons/bs';
import {BsGear} from 'react-icons/bs';
import {BsBell} from 'react-icons/bs'


const StyledWrapper = styled.div`
  display:flex;
  color:${({theme})=> theme.textSecondary};
  padding:30px;
  justify-content: space-between;
  padding-left:400px;

  & > p {
      color:${({theme})=> theme.textSecondary};
      display: flex;
      align-items: center;
      justify-content: center;
  }
  & > p > span {
     margin-right:5px;
     font-size:24px;

  }
`
const IconWrapper = styled.div`
    font-size:24px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width:200px;
    & > svg {
        cursor: pointer;
    }
`

const UserBar = ({name,image}) => {
   
    return ( 
        <StyledWrapper>
                <Paragraph thinSmall ><span><BsPerson/></span> {name}</Paragraph>
                <IconWrapper>
                    <BsGear/>
                    <BsBell/>
                    <Logo avatar src={image}/>
                </IconWrapper>
             
              
           
        </StyledWrapper>

     );
}
 
export default UserBar;