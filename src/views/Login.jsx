import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { authParams } from '../authParams/authParams';
import BackgroundImage from '../assets/images/auroraBgc.png';
import LoginForm from '../components/organisms/LoginForm';
import Loading from '../components/organisms/Loading';
import {routes} from '../routes/routes'
 
const SCOPES = 'streaming user-read-private user-read-email user-read-playback-state user-read-currently-playing user-modify-playback-state user-follow-modify user-follow-read streaming';
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${authParams.client_id}&response_type=code&redirect_uri=${authParams.login_redirect}&${SCOPES ? '&scope=' + encodeURIComponent(SCOPES) : ''}`

const StyledWrapper = styled.div`
  background: url(${BackgroundImage});
  min-height:100vh;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`


const Login = () => {

    const [isLoading, setLoadingStatus] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoadingStatus(false)
        },3300)
    }, [])


    return ( 
        <StyledWrapper>
          {isLoading ? 
              <Loading isVisible={isLoading}/>
              :
              <LoginForm 
                  url={AUTH_URL}
                  help={routes.help}
            />
            }
        </StyledWrapper>
     );
}
 
export default Login;