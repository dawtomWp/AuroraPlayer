import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import FeaturedItems from '../components/molecules/FeaturedItems';
import UserPageTemplate from '../templates/UserPageTemplate';
import Heading from '../components/atoms/Heading';
import Paragraph from '../components/atoms/Paragraph';
import NewTrackCard from '../components/molecules/NewTrackCard';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"


import SwiperCore, {
  EffectCoverflow,Pagination,Autoplay,Navigation
} from 'swiper/core';


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



const Start = ({access,api,country}) => {
    const [featured, setFeatured] = useState([]);
    const [isNew, setNew] = useState([])

 

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
          // console.log(data.body.albums.items);
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
     
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [country])

     useEffect(() => {
        if(!featured) return setFeatured([])
        if(!access) return;

        api.setAccessToken(access)

        api.getFeaturedPlaylists({ 
            limit : 8, 
            offset: 1, 
            country: country, 
    
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
    }, [access,country])
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
                  {isNew.map(newTrack => 
                <SwiperSlide key={newTrack.id}>
                  <NewTrackCard  newTrack={newTrack}/>
                  </SwiperSlide>
                  )

                  }

                  </StyledSwiper>

                 <Heading sectionTitle children="Featured"/>
                 <Paragraph thinDesc children="latest playlists"/>
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