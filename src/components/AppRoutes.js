import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux'

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
    const auth = useSelector(state => state.auth)

    return (
        <Route
            exact
            path={path}
            render={props =>
                isPrivate && !Boolean(auth.isLoggedIn) ? (
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