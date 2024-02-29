import React from "react";
import { Route, Redirect } from "react-router-dom";
// import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  console.log(user);
  return (
    <Route
      {...rest}
      render={props => {
        if (user !== null) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
