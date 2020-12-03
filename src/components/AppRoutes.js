import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from '../Context'

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
    const userDetails = useAuthState()

    return (
        <Route
            exact
            path={path}
            render={props =>
                isPrivate && !Boolean(userDetails.isLoggedIn) ? (
                    <Redirect
                        to={{ pathname: "/login", state: { from: props.location } }}
                    />
                ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    )
}

export default AppRoutes