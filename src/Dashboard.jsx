import React, {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';

const spotifyApi = new SpotifyWebApi({
    clientId: 'c0ff485e66904ad18104cafdfc947f7a',
})

const Dashboard = ({code}) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken)
     
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
                    albumUrl: albumImgSmall.url
                }
            }))
        })
     
      return () => cancel = true
    }, [search, accessToken])

    return (
        <section>
                  <input type="search" placeholder="search songs" value={search} onChange={e => setSearch(e.target.value)}></input>

                  <div>
                      {searchResults.map(track => (
                          <TrackSearchResult track={track} key={track.uri}/>
                      ))}
                  </div>
        </section>
  
    );
}
 
export default Dashboard;