import React,{useState,useEffect} from 'react';
import UserPageTemplate from '../templates/UserPageTemplate';
import TrackSearchResult from '../components/molecules/TrackSearchResult';
import axios from 'axios';




const Browser = ({access,api, trackCallback}) => {
   const [searchResults, setSearchResults] = useState([]);
   const [search, setSearch] = useState('');
   const [playingTrack, setPlayingTrack] = useState();
   const [lyrics, setLyrics] = useState("");

   
   const chooseTrack = (track) => {
    setPlayingTrack(track)
    setSearch('')
    setLyrics("")   
    trackCallback(track)
}

    useEffect(() => {
        if(!search) return setSearchResults([]);
        if(!access) return;
    
        let cancel = false;

        api.searchTracks(search).then(res => {
            if(cancel) return;
         //   console.log(res.body.tracks.items)
            setSearchResults(
                res.body.tracks.items.map(track => {

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
                    <input type="search" placeholder="search songs" value={search} onChange={e => setSearch(e.target.value)}></input>
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
                 
                 
                  </div>
                  {/* <Player accessToken={access} trackUri={playingTrack?.uri}/> */}
       </UserPageTemplate>
     );
}
 
export default Browser;