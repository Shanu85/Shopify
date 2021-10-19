import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const BuyerProtectedRoute = ({ component: Component, to, ...rest }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === false ? (
          <Redirect to={to} />
        ) : (
          isAuthenticated === true && user.user_type === "Buyer" ? <Component {...props} />:
          <Redirect to={"/"} />
        )
      }
    />
  );


};

BuyerProtectedRoute.defaultProps = {
  to: "/login"
};

export default BuyerProtectedRoute;
