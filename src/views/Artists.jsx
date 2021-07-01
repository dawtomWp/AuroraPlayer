import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import ArtistsResult from '../components/molecules/ArtistsResult';
import UserPageTemplate from '../templates/UserPageTemplate';
import Heading from '../components/atoms/Heading';



const StyledWrapper = styled.div`
  display:grid;
  width:90%;
  grid-template-columns: repeat(5,1fr);
  grid-gap:20px;
  padding-bottom:100px;
`

const Artists = ({api,access}) => {
   const [favouritesArtists,setFavouritesArtists] = useState([]);

   useEffect(()=>{
       if(!access) return;
       if(!api) return;
      
       api.getFollowedArtists({ limit : 50 })
       .then(function(data) {

      // 'This user is following 1051 artists!'
     console.log(data.body.artists.items);
        setFavouritesArtists(
            data.body.artists.items.map(artist => {
                return {
                    artistAvatar:artist.images[1].url,
                    name: artist.name,
                    followers: artist.followers.total,
                    id: artist.id
                }
            })
        )
  }, function(err) {
    console.log('Something went wrong!', err);
  });


      



   },[access, api])





    return ( 
        <UserPageTemplate>
            <Heading style={{margin:"0px 0px 25px"}} sectionTitle children='Favourite Artists'/>

            <StyledWrapper> 

                      {favouritesArtists.map(artists => (
                                   
                            <ArtistsResult artists={artists} key={artists.id}/>
           
                                ))
                      }
             </StyledWrapper> 

         </UserPageTemplate>

     );
}
 
export default Artists;