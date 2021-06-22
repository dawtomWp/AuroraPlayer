import React from 'react';
import { routes } from './routes/routes';

const SCOPES = 'user-read-private user-read-email';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=c0ff485e66904ad18104cafdfc947f7a&response_type=code&redirect_uri=${routes.login_redirect}&${SCOPES ? '&scope=' + encodeURIComponent(SCOPES) : ''}`

const Login = () => {
    console.log(AUTH_URL)
    return ( 
        <div>
            <a href={AUTH_URL}>Login with Spotify </a>
        </div>
     );
}
 
export default Login;