import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`



*, *::before, *::after {
    box-sizing: border-box;
    padding:0;
    margin:0;
  

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
// happy rems
html {
    font-size: 62.5%; // dzieki temu 1 rem === 10px a nie 16
    letter-spacing: 1px;

}

body {
   font-size: 1.6rem; //sprawiamy zeby dalej byla bazowa fontu wielkosc czaisz nie ?
   font-family: Roboto, sans-serif;
   background-color:#eaebeb7d;

}
.rswp__active {
    position: absolute;
    top:-10px;
    left:-440px;
    
}
.rswp__active img {
    border-radius: 50%;
    box-shadow: 0px 15px 20px 1px #aaaaaa;
}
._InfoRSWP {
    border-bottom: none;
}
.__14rtdjw {
    align-items: center;
    display: flex;
    height: 48px;
    left: -249px;
    top: -8px;
    position: absolute;
    justify-content: center;
}

`;