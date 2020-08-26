import React, { useEffect } from "react";
import "./styles/styles.scss";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header.js";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Switch } from "react-router-dom";
import LogOutPage from "./components/LogOutPage.js";
import { setLoggedIn, setLoggedOut } from "./actions/accountActions";
import RedirectRoute from "./components/RedirectRoute";
import { connect } from "react-redux";
import AllRecipes from "./components/Allrecipes";

import UserRecipes from "./components/UserRecipes";


function App(props) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.setLoggedIn();
    } else {
      props.setLoggedOut();
    }
  }, []);
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <Switch>
        <RedirectRoute exact path="/" />

        <PrivateRoute exact path="/recipes" component={UserRecipes} />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" component={LogOutPage} />
        <Route path="/allrecipes" component={AllRecipes} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.accountReducer.loggedIn,
  };
};
export default connect(mapStateToProps, { setLoggedIn, setLoggedOut })(App);
