import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const BuyerProtectedRoute = ({ component: Component, to, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.role);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === false ? (
          <Redirect to={to} />
        ) : (
          isAuthenticated === true && <Component {...props} />
        )
      }
    />
  );


};

BuyerProtectedRoute.defaultProps = {
  to: "/login"
};

export default BuyerProtectedRoute;
