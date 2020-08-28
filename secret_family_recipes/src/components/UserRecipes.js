import React, { useState, useEffect } from "react";
import RecipeCard from './RecipeCard';
import axios from "axios";
import { getRecipes } from "../actions/recipesActions";
import { connect } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import RecipeForm from './RecipeForm';


function UserRecipes(props) {
  // const [userRecipeList, setUserRecipeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    props.getRecipes(props.user.id);
    
  }, []);

const handleChange = (evt) => {
  setSearchTerm(evt.target.value.toLowerCase());
}

useEffect(()=> {
let currentList = [];
let newList = [];

if(searchTerm !== ''){
  currentList = props.recipes;
  newList = currentList.filter(item => {
    let listItem = item.title.toLowerCase();
    return listItem.includes(searchTerm);
  });
}else {
    newList = props.recipes; 
};
  setFilteredList(newList);
}, [searchTerm, props.recipes])

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
      
      <div className="userRecipes container">
        {filteredList.map((item) => {
          return (
            <RecipeCard
              editable={true}
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
  return {
    recipes: state.recipesReducer.recipes,
    makingChanges: state.recipesReducer.makingChanges,
    user: state.accountReducer.user
  };
};

export default connect(mapStateToProps, { getRecipes })(UserRecipes);