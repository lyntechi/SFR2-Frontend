import React, { useState, useEffect } from "react";
import axios from "axios";
import { getRecipes } from "../actions/recipesActions";
import { connect } from "react-redux";
import RecipeCard from "./RecipeCard";
// This page will render a search bar at the top and recipe cards below
// TO-DO:
// 1. create filter function to filter recipe cards as input value changes

const searchBarValue = " ";

export default function AllRecipes(props) {
  const [searchBar, setSearchBar] = useState(searchBarValue);
  const [recipeList, setRecipeList] = useState([]);

  // Getting all public recipe cards
  useEffect(() => {
    axios
      .get("https://secret-fam-recipe.herokuapp.com/api/recipes")
      .then((res) => {
        setRecipeList(res.data.data);
        // returns array of objects w/recipe data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          return <RecipeCard editable={false} item={item} key={item.id}/>
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
