import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ( { component: Component, ...rest } ) => <Route { ...rest } render = { () => localStorage.getItem( "token" ) ? <Component /> : <Redirect to = "/login" /> } />