import { SET_LOGGED_IN, SET_LOGGED_OUT } from "../actions/accountActions";
const initialState = {
  loggedIn: false,
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
    default:
      return state;
  }
};
