import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Album from '../components/molecules/Album';
import ArtistPhoto from '../components/molecules/ArtistPhoto';
import UserPageTemplate from '../templates/UserPageTemplate';
import Heading from '../components/atoms/Heading';
import TrackSearchResult from '../components/molecules/TrackSearchResult';
import { routes } from '../routes/routes';
import AlbumDetails from './AlbumDetails';
import Button from '../components/atoms/Button';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction:column;
 
`
const InnerWrapper = styled.div`
  display:flex;
  flex-direction: column;
  width:90%;
`

const StyledAlbumsSection = styled.div`
  display:grid;
  grid-template-columns: repeat(5,1fr);
  grid-gap:20px;
  padding-bottom:100px;
`
const StyledBestTracksSection = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap:30px;
  margin-bottom:50px;
`


const DetailsArtist = ({api,access,currentArtist,country, trackCallback, albumCallback}) => {
    const [artist, setCurrentArtist] = useState([]);
    const [appears, setAppears] = useState([])
    const [albums, setAlbums] = useState([])
    const [tracks, setTracks] = useState([])
    const [currentAlbum, setCurrentAlbum] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [displayList, setDisplayListLength] = useState({
      albumsLength: false,
      appearsLength: false
    })

    let artistId = currentArtist.id
    let numberOfAlbums = displayList.albumsLength ? albums.length : 5;
    let numberOfAppears = displayList.appearsLength ? appears.length : 5;

    const handleAlbumsLength = () => {
      setDisplayListLength(prevState =>({
        ...prevState,
        albumsLength: !displayList.albumsLength
      }))
    }
    const handleAppearsLength = () => {
      setDisplayListLength(prevState =>({
        ...prevState,
        appearsLength: !displayList.appearsLength
      }))
    }

    useEffect(() => {
       setCurrentArtist(currentArtist)


       api.getArtistAlbums(artistId)
         .then(function(data) {
         // console.log('Artist albums', data.body);
             setAlbums(
                data.body.items.map(album => {
                  return {
                    image: album.images[1].url,
                    title: album.name,
                    tracks: album.total_tracks,
                    release: album.release_date,
                    uri: album.uri,
                    id: album.id,
                  }
                })
             )
  }, function(err) {
    console.error(err);
  });

 

       api.getArtistAlbums(artistId,{ limit: 50, offset: 20 },
        function(err, data) {
          if (err) {
            console.error('Something went wrong!' + err);
          } else {
  
            console.log(data.body.items);  
            setAppears(
                data.body.items.map(album => {
                    return {
                        image: album.images[1].url,
                        title: album.name,
                        tracks: album.total_tracks,
                        release: album.release_date,
                        uri: album.uri,
                        id: album.id,
                        
                    }
                })
            )        
          }
        }
      );

    },[currentArtist,api])


    useEffect(() => {
        api.getArtistTopTracks(artistId, country)
            .then(function(data) {
           // console.log(data.body);
            setTracks(
                data.body.tracks.slice(0,8).map(track => {
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        id: track.id,
                        uri: track.uri,
                        duration: track.duration_ms,
                        albumName: track.album.name,
                        release: track.album.release_date,
                        albumUrl: track.album.images[0].url
                    }
                })
            )

             }, function(err) {
             console.log('Something went wrong!', err);
         });

        
    }, [api])


    const showAlbum = (album) => {
        setCurrentAlbum(album)
        albumCallback(album)
        setRedirect(true);
        console.log(album, currentAlbum)
    }
    
    console.log(albums)


    return ( 
        <UserPageTemplate>
          {redirect ? 
                 <Redirect to={routes.albumDetails} component={AlbumDetails}/>

                 :
                 <StyledWrapper>

      
                 <InnerWrapper>
                 <ArtistPhoto imgUrl={artist.artistPhoto} item={artist}/>
                 <Heading style={{marginBottom:"20px"}} sectionTitle children="Popular"/>
                  <StyledBestTracksSection>
                    
                     {tracks.map(track => 
                         <TrackSearchResult 
                              track={track} 
                              key={track.id}
                              chooseTrack={trackCallback}
                          />
                     )}
                  </StyledBestTracksSection>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                     <Heading style={{marginBottom:"20px"}} sectionTitle children="Albums & minialbums"/>
                     <Button tertiary onClick={handleAlbumsLength}>{displayList.albumsLength ? "Show less": "Show more"}</Button>
                  </div>
                  <StyledAlbumsSection>
                     {albums.slice(0,numberOfAlbums).map(album => <Album 
                          album={album}
                          key={album.id}
                          onClick={() => showAlbum(album)}
                      />)}

                  </StyledAlbumsSection>
             
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                     <Heading style={{marginBottom:"20px"}} sectionTitle children="Appears On"/>
                     <Button tertiary onClick={handleAppearsLength}>{displayList.appearsLength ? "Show less": "Show more"}</Button>
                  </div>
                  <StyledAlbumsSection>

                  {appears.slice(0,numberOfAppears).map(album => 
                      <Album 
                          album={album}
                          key={album.id}
                          onClick={() => showAlbum(album)}
                      />
                   )}
                  </StyledAlbumsSection>        
                 </InnerWrapper>


     
           
          </StyledWrapper>

          
  
        }
         
     
           
       </UserPageTemplate>
     );
}
 
export default DetailsArtist;