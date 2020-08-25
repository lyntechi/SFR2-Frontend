import React, { useState, useEffect } from "react";
// import Header from "./components/Header.js"; // needs to navigate to signup/login pages
// import RecipeCards from ' ' // need to import recipe component
import axios from "axios";
import { getRecipes } from "../actions/recipesActions";
import { connect } from "react-redux";

// This page will render a search bar at the top and recipe cards below
// TO-DO:
// 1. import Allrecipes.js into Header and App? -- make a link in navbar
// 2. create filter function to filter recipe cards as input value changes
// 3. create an add (+) button? so that when clicked, an empty card template appears
// (importing the RecipeForm component?)
// 4.

const searchBarValue = " ";

function AllRecipes(props) {
  const [searchBar, setSearchBar] = useState(searchBarValue);

  // Filter onChange Function
  // const onRecipeFilterChange = (evt) => {

  // }

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
      <div className="recipes container">{props.recipes.map}</div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipesReducer.recipes,
    makingChanges: state.recipesReducer.makingChanges,
  };
};

export default connect(mapStateToProps, { getRecipes })(AllRecipes);
