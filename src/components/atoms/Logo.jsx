import styled, { css } from 'styled-components';

const Logo = styled.img`
  width:80%;

  ${({small})=> small && css`
     width:60px;
     height:60px;
  `}

`

export default Logo