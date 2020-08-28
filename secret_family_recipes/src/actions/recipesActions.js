import { axiosWithAuth } from "../utils/axiosWithAuth";
export const LOG_ERROR = "LOG_ERROR";
export const UPDATE_RECIPES = "UPDATE_RECIPES";
export const MAKING_CHANGES = "MAKING_CHANGES";
export const ADD_RECIPE = 'ADD_RECIPE'

export const getRecipes = (id) => (dispatch) => {
  axiosWithAuth()
    .get(`/api/users/${id}/recipes`)
    .then((res) => {
      dispatch({ type: UPDATE_RECIPES, payload: res.data.data });
      
    })
    .catch((err) => {
      dispatch({ type: LOG_ERROR, payload: err });
    });
};

export const addRecipes = (recipe) => (dispatch) => {
  dispatch({ type: MAKING_CHANGES });
  axiosWithAuth()
    .post("/api/recipes", recipe)
    .then((res) => {
     
      dispatch({ type: ADD_RECIPE, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: LOG_ERROR, payload: err });
    });
};

export const deleteRecipes = (recipeId) => (dispatch) => 
{
  dispatch({ type: MAKING_CHANGES });
  axiosWithAuth()
    .delete(`/api/recipes/${recipeId}`)
    .then((res) => {
      console.log(" From Delete Recipes" + res);
      dispatch({ type:  "DELETE_RECIPE", payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: LOG_ERROR, payload: err });
    });
};

export const editRecipes = ( id, recipeChanges ) => (dispatch) => {


  console.log( "IN EDIT" );
  dispatch({ type: MAKING_CHANGES });
  axiosWithAuth()
    .put( `/api/recipes/${ id }`, recipeChanges )
    .then( res => {
      dispatch( { type: UPDATE_RECIPES, payload: res.data.data } );

      console.log( "Success" );
    } )
    .catch( err => {
      console.log( "WTF" )
      dispatch( { type: LOG_ERROR, payload: err } );
    } );
};
