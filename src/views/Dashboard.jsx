import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import Player from '../components/molecules/Player';
import axios from 'axios';
import Sidebar from '../components/organisms/Sidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from '../routes/routes';
import Placeholder from './Placeholder'
import Start from './Start';
import Browser from './Browser';



const StyledWrapper = styled.section`
   display:flex;
   min-height:100vh;
`
const PlayPanel = styled.div`
  display: flex;
  align-items: flex-end;
  padding:10px;
  position:fixed;
  background: #ffffff;
  bottom:0;
  left:0;
  width:100%;
  height:100px;
`


const spotifyApi = new SpotifyWebApi({
    clientId: 'c36d86cf60394581b15294dcb6863de9',
})

const Dashboard = ({code}) => {
    const accessToken = useAuth(code);
    const [currentTrack,setCurrentTrack] = useState('');
 

    const handleTrack = (track) => {
        setCurrentTrack({...track})
    }
    
  
  


    return (
        
             <StyledWrapper>
        

                   <BrowserRouter>
                      <Sidebar/>
                      <PlayPanel>                      
                          <Player 
                              accessToken={accessToken} 
                              trackUri={currentTrack?.uri}
                          />                      
                     </PlayPanel> 


                       <Switch>
                          <Route exact path={routes.start}>
                              <Start 
                                 access={accessToken}
                                 api={spotifyApi}
                               />
                          </Route>
                          <Route exact path={routes.browser}>
                              <Browser 
                                   access={accessToken} 
                                   api={spotifyApi} 
                                   trackCallback={handleTrack} 
                               />
                          </Route>
                          <Route exact path={routes.placeholder}>
                              <Placeholder 
                                   code={code} 
                                   api={spotifyApi} 
                                   access={accessToken} 
                              />
                          </Route>
                        </Switch>
                   </BrowserRouter>
        
                   

             
               
            </StyledWrapper>

 
 
    );
}
 
export default Dashboard;