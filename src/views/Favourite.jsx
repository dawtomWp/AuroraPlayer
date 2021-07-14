import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import TrackSearchResult from '../components/molecules/TrackSearchResult';
import UserPageTemplate from '../templates/UserPageTemplate';
import Heading from '../components/atoms/Heading';

const StyledWrapper = styled.div`

`;
const StyledInnerSection = styled.div`
   display: grid;
   grid-column-gap:30px;
   grid-template-columns: 1fr 1fr;
`;


const Favourite = ({access,api,trackCallback}) => {
    const [favouriteTracks, setFavouriteTracks] = useState([])

    useEffect(() => {
        api.getMySavedTracks({
            limit : 50,
            offset: 1
          })
          .then(function(data) {
         //   console.log(data.body.items);
            setFavouriteTracks(
                data.body.items.map(item =>{
                    return {
                        artist: item.track.artists[0].name,
                        title: item.track.name,
                        uri: item.track.uri,
                        duration: item.track.duration_ms,
                        albumName: item.track.album.name,
                        release: item.track.album.release_date,
                        albumUrl: item.track.album.images[0].url
                    }
                })
                
            )
          }, function(err) {
            console.log('Something went wrong!', err);
          });
       
    }, [api])

    console.log(favouriteTracks)

    return ( 
        <UserPageTemplate>
                    <StyledWrapper>
                      <Heading style={{marginBottom:"20px"}} sectionTitle children="Favourite Songs"/>
                       <StyledInnerSection>
                             {favouriteTracks.map(track =>
                                <TrackSearchResult
                                      key={track.uri}
                                      track={track}
                                      chooseTrack={trackCallback}
                                />
                               
                             )}
                       </StyledInnerSection>
                    </StyledWrapper>
        </UserPageTemplate>
     
     );
}
 
export default Favourite;