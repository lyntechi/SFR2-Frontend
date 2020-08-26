import {
  LOG_ERROR,
  UPDATE_RECIPES,
  MAKING_CHANGES,
} from "../actions/recipesActions";

const initialState = {
  recipes: [],
  message: "",
  makingChanges: false,
};

export const recipesReducer = (state = initialState, action) => {
  console.log('reducer')
  switch (action.type) {
    case MAKING_CHANGES:
      return {
        ...state,
        makingChanges: true,
      };
    case UPDATE_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        message: "",
        makingChanges: false,
      };
    case LOG_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
