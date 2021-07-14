import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import ArtistsResult from '../components/molecules/ArtistsResult';
import UserPageTemplate from '../templates/UserPageTemplate';
import Heading from '../components/atoms/Heading';
import Input from '../components/atoms/Input';
import { routes } from '../routes/routes';
import DetailsArtist from './DetailsArtist';



const StyledWrapper = styled.div`
  display:grid;
  width:90%;
  grid-template-columns: repeat(5,1fr);
  grid-gap:20px;
`
const InnerPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:80%;


`

const Artists = ({api,access, artistCallback}) => {
   const [favouritesArtists,setFavouritesArtists] = useState([]);
   const [search, setSearch] = useState('');
   const [currentArtist, setCurrentArtist] = useState('');
   const [redirect,setRedirect] = useState(false);

   useEffect(()=>{
       if(!access) return;
       if(!api) return;
      
       api.getFollowedArtists({ limit : 50 })
       .then(function(data) {

        console.log(data.body.artists);
        setFavouritesArtists(
            data.body.artists.items.map(artist => {
                return {
                    artistAvatar:artist.images[1].url,
                    artistPhoto:artist.images[0].url,
                    name: artist.name,
                    followers: artist.followers.total,
                    id: artist.id,
                    genres: artist.genres[0]
                }
            })
        )
  }, function(err) {
    console.log('Something went wrong!', err);
  });

   },[access, api])

   const handleSearch = (e) => setSearch(e.target.value)

   let filteredArtists = favouritesArtists.filter(artist => {
       return artist.name.toLowerCase().includes(search.toLowerCase())
   })

   const showArtist = (artists) => {
  
       setCurrentArtist(artists)
       artistCallback(artists)
       setRedirect(true)
       console.log(artists, currentArtist)
   
   }
   
    return ( 
        
        <UserPageTemplate>
            
            {redirect ?
               <Redirect to={routes.artistDetails} component={DetailsArtist}/>
             :
             <>
             <InnerPanel>
             <Heading style={{margin:"0px 0px 25px"}} sectionTitle children='Favourite Artists' />
             <Input value={search} placeholder="Search artist..." onChange={handleSearch}/>
          </InnerPanel>


          <StyledWrapper> 

                    {filteredArtists.map(artists => (
                                 
                          <ArtistsResult 
                                artists={artists} 
                                key={artists.id}
                                onClick={() => showArtist(artists)}
                          />
         
                          ))
                    }
                 
                 
                  
           </StyledWrapper>
             </>
        }
    

         </UserPageTemplate>

     );
}
 
export default Artists;