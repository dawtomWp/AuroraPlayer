import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import FeaturedItems from '../components/molecules/FeaturedItems';
import UserPageTemplate from '../templates/UserPageTemplate';
import Heading from '../components/atoms/Heading';
import Paragraph from '../components/atoms/Paragraph';
import NewTrackCard from '../components/molecules/NewTrackCard';
import AlbumDetails from './AlbumDetails';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import SwiperCore, {
  EffectCoverflow,Pagination,Autoplay,Navigation
} from 'swiper/core';
import { routes } from '../routes/routes';
import Button from '../../src/components/atoms/Button'


SwiperCore.use([EffectCoverflow,Pagination,Autoplay,Navigation]);

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
const StyledSwiper = styled(Swiper)`
 width:100%;
 margin:0 auto;
 display: flex;
 padding:40px !important;
`
const StyledFeaturedSectionInfo = styled.div`
  display:flex;
  width:90%;
  justify-content: space-between;
`



const Start = ({access,api,country, albumCallback}) => {
    const [featured, setFeatured] = useState([]);
    const [isNew, setNew] = useState([])

    const [currentAlbum, setCurrentAlbum] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [displayList,setDisplayList] = useState(false);

    let numberOfPlaylists = displayList ? featured.length : 8;

    const showAlbum = (album) => {
        setCurrentAlbum(album)
        albumCallback(album)
        setRedirect(true);
     //   console.log(album, currentAlbum)
    }
    const handlePlaylistsLength = () => {
        setDisplayList(!displayList)
    }

 

    useEffect(() => {
        if(!isNew) return setNew([])
        if(!access) return;
       
        api.getNewReleases({
              limit : 5,
              offset: 0, 
              country: country,
              timestamp:'2020-10-23T09:00:00'
        })
         .then(data => {
        //   console.log(data.body.albums.items);
           setNew(
               data.body.albums.items.map(newTrack => {
                   return {
                   artist: newTrack.artists[0].name,
                   image: newTrack.images[0].url,
                   id: newTrack.id,
                   title: newTrack.name,
                   release: newTrack.release_date,  
                   tracks: newTrack.total_tracks
                   }
               })
           )
         
         })
     
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [country])

     useEffect(() => {
        if(!featured) return setFeatured([])
        if(!access) return;

        api.setAccessToken(access)

        api.getFeaturedPlaylists({ 
            limit : 16, 
            offset: 1, 
            country: country, 
    
        })
        .then(data => { 
             console.log(data.body.playlists.items, "Kawczano");
             setFeatured(
                 data.body.playlists.items.map(item => {
                     return {
                         title: item.name,
                         image: item.images[0].url,
                         id: item.id,
                         tracks: item.tracks.total,
                         release: item.description //fake release name for description
                    
                     }
                 })
             )

         })
         .catch(err => {
            console.log("Something went wrong!", err);
         }) ;  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [access,country])

    console.log(isNew)
    return ( 
        <UserPageTemplate>
              <Heading sectionTitle children="Released"/>
              <Paragraph thinDesc children="latest albums"/>
                  <StyledSwiper 
                      loopAdditionalSlides = {6}
                      activeslidekey={2}
                      loop={true}                                   
                      spaceBetween={-260}
                      effect={'coverflow'} 
                      grabCursor={true} 
                      autoplay = {{
                        "delay": 8000,
                        "disableOnInteraction": false
                      }}        
                 
                      coverflowEffect={{
                        "slideShadows": false,
                        "rotate": 0,
                        "stretch": 600,
                        "depth": 250,
                        "modifier": 2,
                      }} 
                      breakpoints = {{
                        "360": {
                            slidesPerView:1
                        }
                       }}
                    
                      
                       >
                  {redirect ?  
                      <Redirect to={routes.albumDetails} component={AlbumDetails}/>
                        :
                        isNew.map(newTrack => 
                            <SwiperSlide key={newTrack.id}>
                             <NewTrackCard  
                                  album={isNew}
                                  newTrack={newTrack}
                                  onClick = {() =>showAlbum(newTrack)}
                             />
                           </SwiperSlide>
                         )
                         
                        }
         

                  </StyledSwiper>

                <StyledFeaturedSectionInfo>
                    <div>
                      <Heading sectionTitle children="Featured"/>
                      <Paragraph style={{marginBottom:"15px"}} thinDesc children="latest playlists"/>
                    </div>
                    <div>
                       <Button tertiary onClick={handlePlaylistsLength}>{displayList ? "Show less": "Show more"}</Button>
                    </div>
                </StyledFeaturedSectionInfo>

                
                 <StyledBottom>
                 
                   {redirect ?  
                         <Redirect to={routes.albumDetails} component={AlbumDetails}/>
                         :
                          featured.slice(0,numberOfPlaylists).map(featured => (
                  
                            <FeaturedItems 
                                featured={featured}
                                key={featured.id}
                                onClick = {() =>showAlbum(featured)}
                            />
                   
                             ))
                             
                    }
                   

                 </StyledBottom>
         
      
                     
        </UserPageTemplate>
     );
}
 
export default Start;