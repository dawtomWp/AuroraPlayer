import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import DetailsArtist from './DetailsArtist';
import UserPageTemplate from '../templates/UserPageTemplate';
import TrackSearchResult from '../components/molecules/TrackSearchResult';
import axios from 'axios';
import BestResult from '../components/molecules/BestResult';
import Heading from '../components/atoms/Heading';
import ArtistsResult from '../components/molecules/ArtistsResult';
import Input from '../components/atoms/Input';
import Playlist from '../components/molecules/Playlist';
import { routes } from '../routes/routes';
import AlbumDetails from './AlbumDetails';


const StyledInnerWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
const SearchResultWrapper = styled.div`
   display: flex;
   width:60%;
   flex-direction: column;
   & > h1 {
         font-size:20px;
         margin-bottom:30px;
     }
`
const WrapperLeft = styled.div`
   width: 35%;

   & > h1 {
    font-size:1.8rem;
    margin: 50px 0 30px;
   }
`
const ArtistsWrapper = styled.div`
   display: grid;

   grid-template-columns: 1fr 1fr;
   grid-gap:30px;
`
const RecentlyWrapper = styled.div`
   display: grid;
   grid-column-gap:30px;
   grid-template-columns: 1fr 1fr;
`



const Browser = ({access,api, trackCallback, artistCallback,albumCallback}) => {
   const [searchResults, setSearchResults] = useState([]);
   const [bestResult, setBestResult] = useState('')
   const [search, setSearch] = useState('');
   const [playingTrack, setPlayingTrack] = useState();
   const [lyrics, setLyrics] = useState("");
   const [artists, setArtists] = useState([]);
   const [recently,setRecently] = useState([]);
   const [currentArtist, setCurrentArtist] = useState('');
   const [redirect,setRedirect] = useState(false);
   const [playlists, setPlaylists] = useState([]);
   const [currentAlbum, setCurrentAlbum] = useState('');

   const showArtist = (artists) => {
  
    setCurrentArtist(artists)
    artistCallback(artists)
    setRedirect(true)
    console.log(artists)
}


   const chooseTrack = (track) => {
    setPlayingTrack(track)
    setSearch('')
    setLyrics("")   
    trackCallback(track)
    setBestResult('')
}
const showAlbum = (album) => {
    setCurrentAlbum(album)
    albumCallback(album)
    setRedirect(true);
    console.log(album, currentAlbum)
}

    useEffect(()=>{
        if(!access) return;

        api.getMyRecentlyPlayedTracks({
         limit : 30
        })
        .then(data => {
      //   console.log(data.body.items)
         setRecently(
            data.body.items.map(recent => {
                return {
                    played:"Played: " + recent.played_at,
                    title: recent.track.name,
                    duration: recent.track.duration_ms,
                    artist: recent.track.artists[0].name,
                    id: recent.track.id,
                    uri: recent.track.uri,
                    albumName: recent.track.album.name,
                    albumUrl: recent.track.album.images[0].url,
                    release: recent.track.album.release_date,
                }
            })
             
         )
        })
        .catch(err => {
         console.log("Something went wrong!" + err);
       });
    
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[access])

  

    useEffect(() => {
        if(!search) return setSearchResults([]);
        if(!access) return;
    
        let cancel = false;

        api.searchArtists(search)
           .then(data => {
              //   console.log(data.body.artists.items);

                 setArtists(
                   
                    data.body.artists.items.slice(0, 4).map(artist => {
                      
                        return {
                            id: artist.id,
                            name: artist.name,
                            href: artist.href,
                            artistPhoto: artist.images[0] ? artist.images[0].url : null,
                            artistAvatar: artist.images[1] ? artist.images[1].url : null,
                            type: artist.type,
                            uri: artist.uri,
                            followers: artist.followers.total,
                            genres: artist.genres[0] ? artist.genres[0] : null
                        }
                  
                    }) 
                 )
            }
         );

        api.searchTracks(search).then(res => {
            if(cancel) return;
            let bestTrack = res.body.tracks.items[0]

            setBestResult(
         
                bestTrack = {
                    artist: bestTrack.artists[0].name,
                    title: bestTrack.name,
                    uri: bestTrack.uri,
                    duration: bestTrack.duration_ms,
                    albumName: bestTrack.album.name,
                    release: bestTrack.album.release_date,
                    albumUrl: bestTrack.album.images[1].url,
                }
            )
            setSearchResults(
                res.body.tracks.items.slice(0, 17).map(track => {

                const albumImgSmall = track.album.images.reduce(
                (smallest,image) => {
                    if(image.height < smallest.height) return image
                    return smallest
      
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    duration: track.duration_ms,
                    albumName: track.album.name,
                    release: track.album.release_date,
                    albumUrl: albumImgSmall.url,
                }
            }))
 
        })
        api.searchPlaylists(search)
            .then(data => {
                console.log(data.body.playlists.items)
                setPlaylists(
                    data.body.playlists.items.slice(0, 6).map(playlist => {
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
            })

      return () => cancel = true
    },[api,search, access])


    useEffect(()=>{
        if(!playingTrack) return;

        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        })
        .then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    return ( 
       <UserPageTemplate>
             <div>

                <Input type="search" placeholder="Search for songs, artists etc.." value={search} onChange={e => setSearch(e.target.value)}/>
                 
               <StyledInnerWrapper>
            
                    {search.length > 0 ? 
                       <>
                       <WrapperLeft>
                        <BestResult 
                                    bestResult={bestResult}
                                    key={bestResult.uri}
                                    chooseTrack={chooseTrack}
                                />
                        <Heading sectionTitle children='Artists'/>
                        {redirect ? 
                           <Redirect to={routes.artistDetails} component={DetailsArtist}/>
                           :
                           <ArtistsWrapper>
                           {artists.map(artists => (
                              
                               <ArtistsResult 
                                     artists={artists} 
                                     key={artists.id}
                                     onClick={() => showArtist(artists)}
                               />
       
                            ))
                           }
                    
                    </ArtistsWrapper>                 

                        }
                          <Heading sectionTitle children='Playlists'/>
                    <ArtistsWrapper>
                      
                           {redirect ?
                                <Redirect to={routes.albumDetails} component={AlbumDetails}/>
                                :
                                <>                     
                                 {playlists.map(playlist=>
                                           <Playlist 
                                               key={playlist.id}
                                               playlist={playlist}
                                               onClick={()=> showAlbum(playlist)}
                                            />
                                        )}
                                </>
                            }
                    </ArtistsWrapper>
                 
                        </WrapperLeft>

                                <SearchResultWrapper>      
                                {search && <Heading sectionTitle children={'Search result'}/>}
                                {searchResults.map(track => (
                                           
                                           
                                          <TrackSearchResult 
                                               track={track} 
                                               key={track.uri}
                                               chooseTrack={chooseTrack}
                                          />
                                      ))}
                                      {playingTrack  && (
                                          <div style={{whiteSpace: "pre"}}>
                                              {lyrics}
                                          </div>
                                          
                                      )}
                                    
                                  </SearchResultWrapper>
                       </>
                        :
                        <div style={{display:"block"}}>
                                 <Heading style={{margin: "40px 0px 15px"}} sectionTitle children='Recently Played'/>
                                 <RecentlyWrapper>            
                     
                                  {recently.map(track => (
                                   
                                   
                                  <TrackSearchResult 
                                       track={track} 
                                       key={track.played}
                                       chooseTrack={chooseTrack}
                                  />
                              ))}
                              {playingTrack  && (
                                  <div style={{whiteSpace: "pre"}}>
                                      {lyrics}
                                  </div>
                                  
                              )}
                          </RecentlyWrapper>
                          </div>
                       
                        }
                    
                    
              

              
            
                </StyledInnerWrapper>
                    
                     
                 
                 
                  </div>
             
       </UserPageTemplate>
     );
}
 
export default Browser;