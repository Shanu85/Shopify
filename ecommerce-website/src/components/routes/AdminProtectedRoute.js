import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminProtectedRoute = ({ component: Component, to, ...rest }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === false ? (
          <Redirect to={to} />
        ) : (
          isAuthenticated === true && user.user_type === "Admin" ? <Component {...props} />:
          <Redirect to={"/"} />
        )
      }
    />
  );


};

AdminProtectedRoute.defaultProps = {
  to: "/login"
};

export default AdminProtectedRoute;