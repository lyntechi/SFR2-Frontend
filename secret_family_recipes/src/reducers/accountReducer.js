import { SET_LOGGED_IN, SET_LOGGED_OUT, USER_SUCCESS } from "../actions/accountActions";
const initialState = {
  loggedIn: false,
  user: {}
};


export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
      };
      case USER_SUCCESS:
        return{ 
          ...state,
          user: action.payload

        }
        
      
    default:
      return state;
  }
};
