import styled from "styled-components";
import { useNumFormatter } from "../../hooks/useNumFormatter";
import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";
import Logo from "../atoms/Logo";

const ArtistPhotoWrapper = styled.div`
  display:flex;
  flex-direction:column;
  position:relative;
  justify-content: flex-end;
  align-items:flex-start;
  height:500px;
  width:80%;
  background: ${({theme})=>theme.buttonPrimary};
  margin:0 auto;
  box-shadow:0px 0px 30px #dad7d7;
  z-index:-1;
  border-radius:30px;

  &:before {
      content:"";
      position:absolute;
      display:block;
      background: url(${(props) =>props.imgUrl});
      background-repeat: no-repeat;
      background-size:cover;
      background-position: center 30%;
      opacity:.4;
      width:100%;
      height:100%;
      border-radius:30px;
  }
`
const InnerWrapper = styled.div`
   display:flex;
   flex-direction:column;
   padding:20px;
   z-index:10;

   & > img {
       margin-left:25px;
   }
`
const StyledHeading = styled(Heading)`

   text-transform: capitalize;
   color:#ffffff !important;

   font-size:${({theme})=> theme.fontSize.xxl};
`

const ArtistPhoto = ({imgUrl,item}) => {
    const isFormatted = useNumFormatter(item.followers)
    console.log(item)
    return ( 
        <ArtistPhotoWrapper imgUrl={imgUrl}>
            <InnerWrapper>
                <div style={{display:"flex", alignItems: "center"}}>
                <StyledHeading sectionTitle children={item.name}/>
                <Logo detailsSection style={{marginLeft:"20px"}}medium src={item.artistAvatar}/>
                </div>
                <Paragraph style={{color:"#d3d3d3"}}thinSmall>{isFormatted} followers</Paragraph>
                <Paragraph style={{color:"#d3d3d3"}} thinSmall>{item.genres}</Paragraph>
            </InnerWrapper>
    

        </ArtistPhotoWrapper>
     );
}
 
export default ArtistPhoto;

