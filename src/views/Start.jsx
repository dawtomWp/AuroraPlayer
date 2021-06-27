import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import FeaturedItems from '../components/molecules/FeaturedItems';
import UserPageTemplate from '../templates/UserPageTemplate';
import Heading from '../components/atoms/Heading';
import Paragraph from '../components/atoms/Paragraph';
import NewTrackCard from '../components/molecules/NewTrackCard'

const StyledBottom = styled.div`
    display:grid;
    width:90%;
    grid-template-columns: repeat(8,1fr);
    grid-column-gap:20px;

    @media(max-width:1356px) {
        grid-row-gap: 20px;
        grid-template-columns: repeat(4,1fr);
    }
`
const Start = ({access,api}) => {
    const [featured, setFeatured] = useState([]);
    const [isNew, setNew] = useState([])

    useEffect(() => {
        if(!featured) return setFeatured([])
        if(!access) return;

        api.setAccessToken(access)

        api.getFeaturedPlaylists({ 
            limit : 8, 
            offset: 1, 
            country: 'PL', 
            locale: 'pl_PL', 
    
        })
        .then(data => { 
            // console.log(data.body.playlists.items, "Kawczano");
             setFeatured(
                 data.body.playlists.items.map(item => {
                     return {
                         name: item.name,
                         image: item.images[0].url,
                         id: item.id,
                    
                     }
                 })
             )

         })
         .catch(err => {
            console.log("Something went wrong!", err);
         }) ;  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [access])

    useEffect(() => {
       
        api.getNewReleases({
              limit : 1,
              offset: 0, 
              country: 'PL'
        })
         .then(data => {
           console.log(data.body.albums.items);
           setNew(
               data.body.albums.items.map(newTrack => {
                   return {
                   artist: newTrack.artists[0].name,
                   image: newTrack.images[0].url,
                   id: newTrack.id,
                   name: newTrack.name,
                   date: newTrack.release_date,     
                   }
               })
           )
         
         })
     
   
         
     }, [api,access])
    return ( 
        <UserPageTemplate>

                  {isNew.map(newTrack => <NewTrackCard key={newTrack.id} newTrack={newTrack}/>)}


                 <Heading sectionTitle children="Featured playlists"/>
                 <Paragraph thinParagraph children="last week"/>
                 <StyledBottom>

                   {featured.map(featured => (
                        
                            <FeaturedItems 
                                featured={featured}
                                key={featured.id}
                            />
                
                             ))
                             
                        }

                 </StyledBottom>
         
      
                     
        </UserPageTemplate>
     );
}
 
export default Start;