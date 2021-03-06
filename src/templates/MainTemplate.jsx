import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GlobalStyle} from '../theme/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import {theme} from '../theme/mainTheme';

class MainTemplate extends Component {
  
    render ()  {
      const {children} = this.props;
  
      return (
        <div>
      
            <GlobalStyle/>  
    
              <> 
              <ThemeProvider theme={theme}>
                   {children}
              </ThemeProvider>

              </>
        
  
        </div>
      );
    }
  }
  
  
  
  MainTemplate.propTypes = {
      children: PropTypes.element.isRequired,
  }
  
  export default MainTemplate; //high oreder component