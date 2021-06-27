import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
   display: flex;
   flex-direction: column;
   min-height:100vh;
   width:100%;
   background-color:#eaebeb7d;
   padding:20px 0 20px 400px;
`

const UserPageTemplate = ({children}) => {
    return ( 
 
        <Container >
            {children}
        </Container>

     );
}
 
export default UserPageTemplate;