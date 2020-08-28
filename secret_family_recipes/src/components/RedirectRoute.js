import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ( { children, ...rest } ) => <Route { ...rest } render = { () => <Redirect to = "/login" /> } />;