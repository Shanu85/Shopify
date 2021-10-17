import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const SellerProtectedRoute = ({ component: Component, to, ...rest }) => {
    const { isAuthenticated, role, user } = useSelector(state => state.auth);

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

SellerProtectedRoute.defaultProps = {
    to: "/login"
};

export default SellerProtectedRoute;