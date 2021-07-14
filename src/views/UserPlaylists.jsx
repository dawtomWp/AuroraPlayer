import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import UserPageTemplate from '../templates/UserPageTemplate';
import Playlist from '../components/molecules/Playlist';
import Heading from '../components/atoms/Heading';
import { routes } from '../routes/routes';
import AlbumDetails from './AlbumDetails';

const StyledWrapper = styled.div`
  display:grid;
  width:90%;
  grid-template-columns: repeat(5,1fr);
  grid-gap:20px;
  padding-bottom:100px;
`

const UserPlaylists = ({access,api,user, albumCallback, trackCallback}) => {
    const [playlists, setPlaylists] = useState([]);
    const [currentAlbum, setCurrentAlbum] = useState('');
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        if(!user) return;

        api.getUserPlaylists(user.email)
          .then(function(data) {
              console.log('Retrieved playlists', data.body.items);
              setPlaylists(
                  data.body.items.map(playlist => {
                      return {
                          title: playlist.name,
                          id: playlist.id,
                          description: playlist.description,
                          tracks: playlist.tracks.total,
                          owner: playlist.owner.display_name,
                          image: playlist.images[0] ? playlist.images[0].url : null
                      }
                  })
              )
          },function(err) {
              console.log('Something went wrong!', err);
  });
    }, [access])

    console.log(typeof user)

    const showAlbum = (album) => {
        setCurrentAlbum(album)
        albumCallback(album)
        setRedirect(true);
        console.log(album, currentAlbum)
    }


    return ( 
        <UserPageTemplate>
             {redirect ? 
                     <Redirect to={routes.albumDetails}>
                         <AlbumDetails playlistDetails/>    
                     </Redirect>
                     :
                     <>
                     <Heading style={{margin:"0px 0px 25px"}} sectionTitle children='Playlists' />
                     <StyledWrapper>
                          {playlists.map(playlist=>
                                <Playlist 
                                    key={playlist.id}
                                    playlist={playlist}
                                    onClick={()=> showAlbum(playlist)}
                                />
                           )}
                     </StyledWrapper>
                     </>

             }
 

        
        </UserPageTemplate>
     );
}
 
export default UserPlaylists;