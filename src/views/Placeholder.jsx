import React,{useState,useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import UserPageTemplate from '../templates/UserPageTemplate';
import SpotifyWebApi from 'spotify-web-api-node';
import CategoriesList from '../components/molecules/CategoriesList';



const Placeholder = ({api,access}) => {

    const [categories, setCategoryView] = useState([])
    const [currentCategory,setCurrentCategory] = useState();

    const chooseCategory = (category) => {
      console.log(category)
      setCurrentCategory(category)
}


    useEffect(() => {
        if(!access) return;
        api.setAccessToken(access)
    
    api.getCategories({
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
     
    }, [api,access])
  

    return ( 
        <UserPageTemplate>
       
       { 
                      categories.map(category => (
                          <CategoriesList
                               category={category}
                               key={category.link}
                               chooseCategory={chooseCategory}
                          />
                      ))}
        </UserPageTemplate>
     );
}
 
export default Placeholder;