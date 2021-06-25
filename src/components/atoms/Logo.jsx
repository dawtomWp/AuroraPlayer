import styled, { css } from 'styled-components';

const Logo = styled.img`
  width:80%;

  ${({small})=> small && css`
     width:3%;
  `}

`

export default Logo