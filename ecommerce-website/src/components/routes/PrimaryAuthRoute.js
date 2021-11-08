import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrimaryAuthRoute = ({ component: Component, to, ...rest }) => {

  const isPrimaryAuthenticated = useSelector(state => state.auth.isPrimaryAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isPrimaryAuthenticated === true ? 
          <Redirect to={"/register"} /> :
          isPrimaryAuthenticated === false && <Component {...props} />
      }
    />
  );
};

PrimaryAuthRoute.defaultProps = {
  to: "/"
};

export default PrimaryAuthRoute;