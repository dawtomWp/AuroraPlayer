import styled, { css } from 'styled-components';

const Logo = styled.img`
  width:80%;
  cursor:pointer;

  ${({small})=> small && css`
     width:60px;
     height:60px;

  `}
  ${({medium})=> medium && css`
     width:100px;
     height:100px;
     text-align:center;
     border-radius:50%;
     box-shadow: 0px 5px 15px 1px #858585;
     &:hover {
      box-shadow: 0px 5px 10px 3px #858585;

     }
  `}
  ${({avatar}) => avatar && css`
       box-shadow: 0px 15px 20px 1px #aaaaaa;
       border-radius:50%;
       width:40px;
       height:40px;
  `}

`

export default Logo