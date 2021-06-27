import React from 'react';


const CategoriesList = ({category, chooseCategory}) => {

    function handleCategorySet() {
        chooseCategory(category)
    }
    return ( 
        <div>
             <img 
                src={category.icon} 
                style={{height: "64px", width: '64px'}} 
                alt="song poster"
                onClick={handleCategorySet}
                />
             <p>{category.name}</p>
        </div>
     );
}
 
export default CategoriesList;