import React,{useRef} from 'react';
import styled from 'styled-components';
import {GoSearch} from 'react-icons/go';


const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({theme})=> theme.textSecondary};
  cursor: pointer;
`

const StyledInput = styled.input`
  border:none;
  padding:10px 9px 10px 7px;
  width:230px;

  color: ${({theme})=> theme.textSecondary};
  font-weight:${({theme})=> theme.fontWeight.bold};
  background:none;
`
const StyledSearch = styled(GoSearch)`
display: inline-block;
 font-size:20px;
 margin-right:4px;

`

const Input = ({onChange, placeholder}) => {
    const refInput = useRef(null)

    const handleSearch = () => {
        refInput.current.focus();
    }
    return ( 
        <StyledWrapper>
        <StyledSearch onClick={handleSearch}/>
        <StyledInput 
           ref={refInput}
           onChange={onChange}
           placeholder={placeholder}
        />
        </StyledWrapper>
     );
}
 
export default Input;