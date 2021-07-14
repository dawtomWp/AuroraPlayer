import styled, { css } from 'styled-components';

const Button = styled.a`
   display: flex;
   background: ${({theme})=>theme.buttonPrimary};
   background-size: 400px; 
   border-radius:30px;
   justify-content: center;
   align-items: center;
   line-height: 25px;
   color:#ffffff;
   font-weight:700;
   text-decoration:none;
   text-transform:uppercase;
   height:45px;
   border:none;
   cursor:pointer;
   width: 200px;
   box-shadow:5px 5px 10px 2px #a4a8a8;
   transition: all .4s;
   & > span {
       display: inline-block;
       margin-left: 5px;
       font-size:30px;
  
   }
   &:hover {
    background-position:200px;  
   }

  ${({secondary}) => secondary && css`
    background: ${({theme})=> theme.alternative};
    width:150px;
    height:35px;
    /* box-shadow:5px 5px 10px 1px #dcdddd; */
    &:hover {
        opacity: .6;
    }
  `}
  ${({normal})=> normal && css`
      width:160px;
      height:38px; 
      font-size: ${({theme})=>theme.fontSize.small};
      margin-left:20px;

      & > span {
        margin-right:8px; 
      }
  `}
  ${({tertiary})=> tertiary && css`
      width:120px;
      background:none;
      box-shadow:none;
      color:#464646;
      height:38px; 
      font-size: ${({theme})=>theme.fontSize.small};
      font-weight: ${({theme})=> theme.fontWeight.regular};

      & > span {
        margin-right:8px; 
      }
  `}
`
export default Button;