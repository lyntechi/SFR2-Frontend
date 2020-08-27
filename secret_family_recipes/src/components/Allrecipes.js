import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";


export default function AllRecipes(props) {
  const [recipeList, setRecipeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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


const handleChange = (evt) => {
  let currentList = [];
  let newList = [];

  if(evt.target.value !== ''){
    // debugger
    currentList = recipeList;
    newList = currentList.filter(item => {
      let listItem = item.title.toLowerCase();
      let searchTerm = evt.target.value.toLowerCase();
      return listItem.includes(searchTerm);
    });
  }else {
      newList = recipeList; 
  };
    setFilteredList(newList);
  }

  return (
    <>
        <input
          type="text"
          // value={}
          placeholder="Search by keyword"
          onChange={handleChange}
          className="searchBar"
        />

      {/* <div className="recipes container">
          {recipeList.map((item) => {
          return <RecipeCard editable={false} item={item} key={item.id} filteredList={handleChange}/>
      })}
      </div> */}
      <div className="filteredRecipes container">
        {filteredList.map((item) => {
            return <RecipeCard editable={false} item={item} key={item.id}/>
        })}
      </div>
 
    </>
  );
}
