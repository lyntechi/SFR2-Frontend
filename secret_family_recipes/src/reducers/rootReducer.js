import { combineReducers } from "redux";
import { recipesReducer } from "./recipesReducer";
import { accountReducer } from "./accountReducer";

export default combineReducers( { recipesReducer, accountReducer } );