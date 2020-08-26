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

function UserRecipes(props) {
  const [searchBar, setSearchBar] = useState(searchBarValue);
  const [userRecipeList, setUserRecipeList] = useState([]);


  useEffect(() => {
    props.getRecipes()
  },[])
  
  // For SEARCHBAR: Filter onChange Function
  //   const onRecipeFilterChange = (evt) => {
  //     const { } = evt.target
  //   }

  // For SEARCHBAR: Filtered results
  //   const filteredRecipes = allRecipes.filter((recipe) => {
  //     return recipe.title.toLowerCase().includes();
  //   });
  console.log('props recipes',props.recipes)
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
        {props.recipes.map((item) => {
          console.log('recipes item',item)
          return (
            <RecipeCard
              item={item}
              key={item.id}
              makingChanges={props.makingChanges}
            />
          );
        })}
      </div>

      <div className="recipe form">
        <RecipeForm />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('this is state',state)
  return {
    recipes: state.recipesReducer.recipes,
    makingChanges: state.recipesReducer.makingChanges,
  };
};

export default connect(mapStateToProps, { getRecipes })(
  UserRecipes
);
