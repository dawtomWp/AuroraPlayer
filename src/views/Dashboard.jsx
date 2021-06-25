import React, {useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import axios from 'axios';
import CategoriesList from './CategoriesList';
import Sidebar from '../components/organisms/Sidebar';

const spotifyApi = new SpotifyWebApi({
    clientId: 'c36d86cf60394581b15294dcb6863de9',
})

const Dashboard = ({code}) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");
    const [categories, setCategoryView] = useState([])
    const [currentCategory,setCurrentCategory] = useState();

    const chooseTrack = (track) => {
           setPlayingTrack(track)
           setSearch('')
           setLyrics("")   
    }
    const chooseCategory = (category) => {
           console.log(category)
           setCurrentCategory(category)
    }
  

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


    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken)

        
        
    spotifyApi.getCategories({
        limit : 10,
        offset: 0,
        country: 'PL',
        locale: 'pl_PL'
    })
    .then(data => {
      console.log(data.body.categories.items, 'LEENO PALEENO');
      setCategoryView(
          data.body.categories.items.map(category => {
            console.log(category.icons[0].url)
            return {
                name: category.name,
                link: category.href,
                icon: category.icons[0].url
            }
          })
      )
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
     
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([]);
        if(!accessToken) return;
   
        let cancel = false;

        spotifyApi.searchTracks(search).then(res => {
            if(cancel) return;
            console.log(res.body.tracks.items)
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
    }, [search, accessToken])

    

    return (
        <section>
                  <input type="search" placeholder="search songs" value={search} onChange={e => setSearch(e.target.value)}></input>
                <Sidebar/>
                  <div>
                      {searchResults.map(track => (
                          <TrackSearchResult 
                               track={track} 
                               key={track.uri}
                               chooseTrack={chooseTrack}
                          />
                      ))}
                      {searchResults.length === 0 && (
                          <div style={{whiteSpace: "pre"}}>
                              {lyrics}
                          </div>
                          
                      )}
                      { 
                      categories.map(category => (
                          <CategoriesList
                               category={category}
                               key={category.link}
                               chooseCategory={chooseCategory}
                          />
                      ))}
                  </div>
                  <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
        </section>
  
    );
}
 
export default Dashboard;