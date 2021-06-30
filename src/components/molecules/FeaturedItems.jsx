import React from 'react';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import Paragraph from '../atoms/Paragraph';


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
 
`



const FeaturedItems = ({featured}) => {
    return ( 
        <StyledWrapper>


                <Logo medium src={featured.image}/>
                <Paragraph thinSmallCenter children={featured.name}/>
        
        </StyledWrapper>
     );
}
 
export default FeaturedItems;