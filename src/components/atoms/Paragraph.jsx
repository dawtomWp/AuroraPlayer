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
   ${({navitem}) => navitem && css`
      text-transform:uppercase;
      text-decoration:none;
      font-size: ${({theme})=>theme.fontSize.small};
      font-weight:${({theme})=>theme.fontWeight.bold};
      margin-top:18px;
      width:180px;
      color: ${({theme})=> theme.textSecondary};
      padding: 12px 0px 12px 20px;
      transition: all .4s;

      & > span {
         margin-right:12px;
         display: inline-block;
       
     
      }
      &:hover {
         color: ${({theme})=>theme.primary};
         border-left:6px solid ${({theme})=>theme.secondary};
         background: linear-gradient(127deg, rgba(0,209,209,0.5354516806722689) 0%, rgba(255,255,255,0) 51%);

         & > span {
            color: ${({theme})=>theme.primary};
         }
      }
   `}

`
export default Paragraph;