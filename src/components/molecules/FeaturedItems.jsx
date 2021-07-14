import React from 'react';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import Paragraph from '../atoms/Paragraph';


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-bottom:30px;
 
`



const FeaturedItems = ({featured, onClick}) => {
    return ( 
        <StyledWrapper onClick={onClick}>
                <Logo medium src={featured.image}/>
                <Paragraph thinSmallCenter children={featured.title}/>
        
        </StyledWrapper>
     );
}
 
export default FeaturedItems;