import React, { useState, useEffect } from "react";
import RecipeCard from './RecipeCard';
import axios from "axios";
import { getRecipes } from "../actions/recipesActions";
import { connect } from "react-redux";
import RecipeCard from "./RecipeCard";
import { axiosWithAuth } from "../utils/axiosWithAuth";

// TO-DO:
// 1. create an add (+) button which pops up a recipe form

const searchBarValue = " ";

export default function AllRecipes(props) {
  const [searchBar, setSearchBar] = useState(searchBarValue);
  const [userRecipeList, setUserRecipeList] = useState([])

    // Getting all User's recipe cards 
  useEffect(()=> {
      axios.get('') // LYNDA's CODE HERE
      .then(res => {
        setUserRecipeList(res.data.data) 
        console.log(res.data.data)
      })
      .catch(err => {
          console.log(err)
      })
  }, [])

  // For SEARCHBAR: Filter onChange Function
//   const onRecipeFilterChange = (evt) => {
//     const { } = evt.target
//   }

  // For SEARCHBAR: Filtered results
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
        />
      </label>
      <div className="recipes container">
          {recipeList.map((item) => {
          return <RecipeCard item={item} />
      })}
      </div>

      <div className='recipe form'>
          <RecipeForm />
      </div>
    </>
  );
}

