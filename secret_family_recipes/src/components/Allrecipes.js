import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";


const searchBarValue = " ";

export default function AllRecipes(props) {
  const [searchBar, setSearchBar] = useState(searchBarValue);
  const [recipeList, setRecipeList] = useState([])

    // Getting all public recipe cards 
  useEffect(()=> {
      axios.get('https://secret-fam-recipe.herokuapp.com/api/recipes')
      .then(res => {
        setRecipeList(res.data.data) 
        // console.log(res.data.data) // returns array of objects w/recipe data
      })
      .catch(err => {
          console.log(err)
      })
  }, [])

// debugger
  // Filter onChange Function
  const onRecipeFilterChange = (evt) => {
     const { name, value } = evt.target
   
  }

  // // Filtered results
  //   const filteredRecipes = allRecipes.filter((recipe) => {
  //     return recipe.title.toLowerCase().includes();
  //   });

  return (
    <>
      <label>
        <input
          type="text"
          // value=''
          placeholder="Search by keyword"
          // onChange={onRecipeFilterChange}
          className="searchBar"
        />
      </label>
      <div className="recipes container">
          {recipeList.map((item) => {
          return <RecipeCard item={item} key={item.id} />
      })}
      </div>
    </>
  );
}

