import React from "react";
import { Redirect, Route,  Switch } from "react-router-dom";
import {withRouter} from 'react-router';

import { useAuthState } from '../Context'

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {

    const userDetails = useAuthState()
    console.log("AppRoutes | userDetails:" , userDetails , userDetails.userID)
    return (
        <Route
            exact
            path={path}
            // component={withRouter(Component)}
            render={props =>
                isPrivate && !Boolean(userDetails.isLoggedIn) ? (
                    <Redirect
                        to={{ pathname: "/login" ,  state: { from: props.location }}}
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