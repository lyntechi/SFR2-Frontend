import React from "react";
import { Route, Redirect } from "react-router-dom";

const RedirectRoute = ({ children, ...rest }) => {
  return <Route {...rest} render={() => <Redirect to="/login" />} />;
};

export default RedirectRoute;
