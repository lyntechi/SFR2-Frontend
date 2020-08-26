import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Allrecipes from "./Allrecipes";

function Header(props) {
  return (
    <header>
      {!props.loggedIn && (
        <>
          <Link to="/login" id="loginLink">
            <h2>Login</h2>
          </Link>
          <Link to="/signup" id="signUpLink">
            <h2>Sign Up</h2>
          </Link>
          <Link to="/allrecipes" id="allRecipesLink">
            <h2>Recipes</h2>
          </Link>
        </>
      )}
      {props.loggedIn && (
        <>
          <Link to="/allrecipes" id="signUpLink">
            <h2>Recipes</h2>
          </Link>
          <Link to="/logout" id="signUpLink">
            <h2>Log Out</h2>
          </Link>
        </>
      )}
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.accountReducer.loggedIn,
  };
};

export default connect(mapStateToProps, {})(Header);
