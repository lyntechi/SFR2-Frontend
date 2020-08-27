import {
  LOG_ERROR,
  UPDATE_RECIPES,
  MAKING_CHANGES,
  ADD_RECIPE
} from "../actions/recipesActions";

const initialState = {
  recipes: [],
  message: "",
  makingChanges: false,
};

export const recipesReducer = (state = initialState, action) => {
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
      case ADD_RECIPE:
        return{ 
          ...state,
          recipes: [...state.recipes, action.payload]
        }
    case LOG_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
