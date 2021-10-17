import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, to, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.role);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          (role === "Seller"? <Redirect to={"/seller_dashboard"} /> : <Redirect to={"/products"}/>)
        ) : (
          isAuthenticated === false && <Component {...props} />
        )
      }
    />
  );
};

AuthRoute.defaultProps = {
  to: "/"
};

export default AuthRoute;
