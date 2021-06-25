import styled, { css } from "styled-components";

const Heading = styled.h1 `
   font-size: ${({theme})=> theme.fontSize.extraLarge};
   background-image:${({theme})=> theme.buttonPrimary};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;

   ${({sidebarTitle})=> sidebarTitle && css`
     font-size: ${({theme})=> theme.fontSize.large};
     margin-top:12px;
   `}



`
export default Heading