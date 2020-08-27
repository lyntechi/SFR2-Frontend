import { axiosWithAuth } from "../utils/axiosWithAuth";
export const LOG_ERROR = "LOG_ERROR";
export const UPDATE_RECIPES = "UPDATE_RECIPES";
export const MAKING_CHANGES = "MAKING_CHANGES";
export const ADD_RECIPE = 'ADD_RECIPE'

export const getRecipes = (id) => (dispatch) => {
  axiosWithAuth()
    .get(`/api/users/${id}/recipes`)
    .then((res) => {
      console.log('res',res)
      dispatch({ type: UPDATE_RECIPES, payload: res.data.data });
      
    })
    .catch((err) => {
      dispatch({ type: LOG_ERROR, payload: err });
    });
};

export const addRecipes = (recipe) => (dispatch) => {
  dispatch({ type: MAKING_CHANGES });
  console.log("this is res data");
  axiosWithAuth()
    .post("/api/recipes", recipe)
    .then((res) => {
     
      dispatch({ type: ADD_RECIPE, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: LOG_ERROR, payload: err });
    });
};

export const deleteRecipes = (recipeId) => (dispatch) => {
  dispatch({ type: MAKING_CHANGES });
  axiosWithAuth()
    .delete(`/api/recipes/${recipeId}`)
    .then((res) => {
      dispatch({ type: UPDATE_RECIPES, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: LOG_ERROR, payload: err });
    });
};

export const editRecipes = (recipe) => (dispatch) => {
  dispatch({ type: MAKING_CHANGES });
  axiosWithAuth()
    .put(`/api/recipes/${recipe.id}`, recipe)
    .then((res) => {
      dispatch({ type: UPDATE_RECIPES, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: LOG_ERROR, payload: err });
    });
};
