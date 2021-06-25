import styled, { css } from 'styled-components';

const Paragraph = styled.p`
   font-size: ${({theme})=>theme.fontSize.large};
   font-weight: ${({theme})=> theme.fontWeight.normal};
   color: black;

   ${({thinParagraph}) => thinParagraph && css`
      font-weight:${({theme})=>theme.fontWeight.thin};
   `}
   ${({boldParagraph}) => boldParagraph && css`
      font-weight:${({theme})=>theme.fontWeight.bold};
   `}

`
export default Paragraph;