import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import UserPageTemplate from '../templates/UserPageTemplate';
import Logo from '../components/atoms/Logo';
import Paragraph from '../components/atoms/Paragraph';
import TrackSearchResult from '../components/molecules/TrackSearchResult';
import Heading from '../components/atoms/Heading';

const StyledAlbumWrapper = styled.div``;
const StyledInfoWrapper = styled.div`
  display:flex;
  margin-bottom:20px;
  background:white;
  padding:20px;
  margin-right:40px;
  & > div {
      display:flex;
      flex-direction:column;
      justify-content: center;
      margin-left:20px;
  }
`;



const AlbumDetails = ({api,currentAlbum, trackCallback, playlistDetails}) => {

    const [album,setAlbum] = useState([]);
    const [tracksList,setTracksList] = useState([])
    const [playlistTracksList,setPlaylistTracksList] = useState([])

    useEffect(() => {
        setAlbum(currentAlbum)
        api.getAlbumTracks(currentAlbum.id)
       .then(function(data) {
             console.log(data.body);
             setTracksList(
                 data.body.items.map(track => {
                     return {
                        title: track.name,
                        id: track.id,
                        artist: track.artists[0].name,
                        duration: track.duration_ms,
                        number: track.track_number,
                        uri: track.uri,

                     }
                 })
             )
        }, function(err) {
             console.log('Something went wrong!', err);
        });
    }, [currentAlbum,api])

    useEffect(() => {
        setAlbum(currentAlbum)
        api.getPlaylistTracks(currentAlbum.id)
       .then(function(data) {
             console.log(data.body.items);
             setPlaylistTracksList(
                 data.body.items.map(playlistTrack => {
                     return {
                        title: playlistTrack.track.name,
                        id: playlistTrack.track.id,
                        artist: playlistTrack.track.artists[0].name,
                        duration: playlistTrack.track.duration_ms,
                        albumUrl: playlistTrack.track.album.images[2] ? playlistTrack.track.album.images[2].url : null,
                        uri: playlistTrack.track.uri,

                     }
                 })
             )
        }, function(err) {
             console.log('Something went wrong!', err);
        });
    }, [currentAlbum,api])

  //  console.log(playlistTracksList)

    return ( 
        <UserPageTemplate>
                       <StyledInfoWrapper>
                           <Logo medium style={{width:"300px", height:"300px"}} src={album.image}/>                
                            <div>
                               <h1>{album.title}</h1>
                               <Paragraph thinDesc children={album.release}/>
                               <Paragraph thinDesc>{album.description}</Paragraph>
                               <Paragraph thinDesc>{album.tracks} tracks</Paragraph>
                            </div>

                       </StyledInfoWrapper>


                       <StyledAlbumWrapper>
                           <Heading sectionTitle children="Tracks"/>
        
                                {playlistTracksList.map(track => <TrackSearchResult
                                    playlistTrack
                                    track={track} 
                                    key={track.id}
                                    chooseTrack={trackCallback}
                                  />)
                                }
                                {tracksList.map(track => <TrackSearchResult
                                    albumItem   
                                    track={track} 
                                    key={track.id}
                                    chooseTrack={trackCallback}
                                  />)
                                }
                           
                       </StyledAlbumWrapper>
        </UserPageTemplate>

   
     );
}
 
export default AlbumDetails;