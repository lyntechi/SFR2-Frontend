import React, { useState, useEffect } from "react";
// import Header from "./components/Header.js"; // needs to navigate to signup/login pages
// import RecipeCards from ' ' // need to import recipe component
import axios from "axios";
import { getRecipes } from "../actions/recipesActions";
import { connect } from "react-redux";
import RecipeCard from "./RecipeCard";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// This page will render a search bar at the top and recipe cards below
// TO-DO:
// 1. import Allrecipes.js into Header and App? -- make a link in navbar
// 2. create filter function to filter recipe cards as input value changes
// 3. create an add (+) button? so that when clicked, an empty card template appears
// (importing the RecipeForm component?)
// 4.

const searchBarValue = " ";

export default function AllRecipes(props) {
  const [searchBar, setSearchBar] = useState(searchBarValue);
  const [recipeList, setRecipeList] = useState([])

    // Getting all public recipe cards 
  useEffect(()=> {
      axios.get('https://secret-fam-recipe.herokuapp.com/api/recipes')
      .then(res => {
        
        setRecipeList(res.data.data) 
        console.log(res.data.data) // returns array of objects w/recipe data
      })
      .catch(err => {
          console.log(err)
      })
  }, [])

// console.log(props.recipes) // returns empty array atm

  // Filter onChange Function
//   const onRecipeFilterChange = (evt) => {
//     const { } = evt.target
//   }

  // Filtered results
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
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     recipes: state.recipesReducer.recipes,
//     makingChanges: state.recipesReducer.makingChanges,
//   };
// };

// export default connect(mapStateToProps, { getRecipes })(AllRecipes);
