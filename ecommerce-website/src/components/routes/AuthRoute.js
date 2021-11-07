import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, to, ...rest }) => {

  const { isAuthenticated, user } = useSelector(state => state.auth);

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
  to: "/"
};

export default AuthRoute;
