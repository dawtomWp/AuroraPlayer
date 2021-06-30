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
    position: fixed;

    bottom:25px;
    left:20px;
    
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
    left: 170px;
    bottom: 25px;
    position: fixed;
    justify-content: center;
}

.__14rtdjw button.rswp__toggle {
    font-size: 19px;
    width:35px;
    display: flex;
    align-items: center;
    justify-content: center;
    height:35px;
    background-color: rgb(0, 209, 209);
    border-radius: 50%;
    box-shadow:0px 15px 20px 1px #91f3dbdd;
}
.__14rtdjw button.rswp__toggle svg {
    color:white;
}
.PlayerRSWP {
    min-height:40px !important; 
    cursor: pointer;
    height:40px;
}
._ActionsRSWP {
    position:absolute;
    top:-24px;
    right:-230px;
}

`;