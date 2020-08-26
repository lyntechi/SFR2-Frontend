import React, { useState, useEffect } from "react";
import RecipeCard from './RecipeCard';
import axios from "axios";
import { getRecipes } from "../actions/recipesActions";
import { connect } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import RecipeForm from './RecipeForm';

// TO-DO:
// 1. create an add (+) button which pops up a recipe form

const searchBarValue = " ";

export default function AllRecipes(props) {
  const [searchBar, setSearchBar] = useState(searchBarValue);
  const [userRecipeList, setUserRecipeList] = useState([])

    // Getting all User's recipe cards 
  useEffect(()=> {
      axios.get('https://secret-fam-recipe.herokuapp.com/api/recipes') // LYNDA's CODE HERE
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
          {userRecipeList.map((item, index) => {
          return <RecipeCard key={index} item={item} />
      })}
      </div>

      <div className='recipe form'>
          <RecipeForm />
      </div>
    </>
  );
}

