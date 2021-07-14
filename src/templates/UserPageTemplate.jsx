import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
   display: flex;
   flex-direction: column;
   width:100%;
   padding:20px 0 150px 400px;
`

const UserPageTemplate = ({children}) => {
    return ( 
 
        <Container >
            {children}
        </Container>

     );
}
 
export default UserPageTemplate;