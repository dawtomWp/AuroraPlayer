import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/organisms/Sidebar';

const Container = styled.div`
   padding:20px 0 20px 400px;
`


const UserPageTemplate = ({children}) => {
    return ( 
        <>
        <Sidebar/>
        <Container>
            {children}
        </Container>
        </>
     );
}
 
export default UserPageTemplate;