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
`
export default Button;