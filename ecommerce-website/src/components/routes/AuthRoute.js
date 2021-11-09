import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, to, ...rest }) => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          (user.user_type === "Admin" ? <Redirect to={"/admin/"} /> :
            (user.user_type === "Seller" ? <Redirect to={"/seller_dashboard"} /> : <Redirect to={"/products"} />))
        ) : (
          isAuthenticated === false && <Component {...props} />
        )
      }
    />
  );
};

AuthRoute.defaultProps = {
  to: "/primary-register"
};

export default AuthRoute;
