import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";


export default function AllRecipes(props) {
  const [recipeList, setRecipeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Getting all public recipe cards
  useEffect( () => {
    axios
      .get("https://secret-fam-recipe.herokuapp.com/api/recipes")
      .then( res => { setRecipeList( res.data.data ); })
      .catch(( err ) => { console.log( err ) } );
  }, []);

  const handleChange = evt => { setSearchTerm( evt.target.value.toLowerCase() ) };

  useEffect( () => { setFilteredList( recipeList.filter( recipe => recipe.title.toLowerCase().includes( searchTerm ) ) ) }, [ searchTerm, recipeList ] );

  return (
    <>
    <div className='searchContainer'>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by keyword"
          onChange={handleChange}
          className="searchBar"
        />
      </div>
      <div className="filteredRecipes container">
        {filteredList.map((item) => {
            return ( 
            <RecipeCard 
              editable={false} 
              item={item} 
              key={item.id}
            />
          );
        })}
      </div> 
    </>
  );
}
