import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import Player from '../components/molecules/Player';
import Sidebar from '../components/organisms/Sidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from '../routes/routes';
import Placeholder from './Placeholder'
import Start from './Start';
import Browser from './Browser';
import UserBar from '../components/molecules/UserBar';



const StyledWrapper = styled.section`
   display:flex;
   flex-direction: column;
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
    const [user, setUser] = useState([]);
    const [country,setCountry] = useState();
    const [avatar,setAvatar] = useState();

    

    useEffect(() => {
        if(!user) return setUser([]);
        if(!accessToken) return;
  
        spotifyApi.getMe()
          
            .then(data => {
                console.log(data.body)
  
                setUser(data.body.display_name)
                setCountry(data.body.country)
                setAvatar(data.body.images[0].url)
              
            })
            .catch(err => {
               console.log("Something went wrong!", err);
            }) ;
         

    },[accessToken, user])

    console.log(country)
 

    const handleTrack = (track) => {
        setCurrentTrack({...track})
    }
    
  
  

    return (
   
        
             <StyledWrapper>
        

                   <BrowserRouter>
                      <Sidebar/>
                      <UserBar        
                              name={user}
                              image={avatar}
                        />
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
                                 country={country}
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