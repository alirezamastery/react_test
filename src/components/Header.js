import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import axiosInstance from '../axios';
import { useAuthDispatch, logout, useAuthState } from '../Context';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `2px solid ${theme.palette.divider}`,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}));

const UserStatus = () => {
    const userDetails = useAuthState();
    const dispatch = useAuthDispatch();

    const [username, setUsername] = useState('')

    if (userDetails.userID) {

        axiosInstance  // make this logic a separate function & use it in shopping cart
            .get(`user/detail/${userDetails.userID}/`)
            .then((res) => {
                setUsername(res.data.username)
            }).catch(error => {
                if (error.message === 'refresh_token_expired') {
                    console.log("in Header | UserStatus | we got the error")
                    logout(dispatch)
                } else {
                    console.log("in Header | UserStatus | unexpected error: ", error)
                }
            })

        return (
            <>
                <h6 className="m-1">خوش امدید {username}</h6>
                <nav>
                    <Link to="/logout" >
                        <button className="btn btn-outline-info shadow-none ml-1 mr-1">حساب کاربری</button>
                    </Link>
                    <Link to="/logout" >
                        <button className="btn btn-outline-danger ml-1 mr-1">خروج</button>
                    </Link>
                </nav>
            </>
        )
    }
    else {
        return (
            <nav>
                <Link to="/login" >
                    <button className="btn btn-outline-info shadow-none ml-1 mr-1">وارد شوید</button>
                </Link>
                <Link to="/register" >
                    <button className="btn btn-info shadow-none ml-1 mr-1">ثبت نام</button>
                </Link>
            </nav>
        )
    }
}

function Header() {
    const userDetails = useAuthState();

    console.log('in Header | userDetails: ', userDetails)

    const classes = useStyles();

    let history = useHistory();
    const [data, setData] = useState({ search: '' });
    const goSearch = (e) => {
        console.log('data.search', data.search)
        history.push({
            pathname: '/olagh/search/',
            search: '?search=' + data.search
        });
        window.location.reload();
    };



    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        <Link to="/">
                            فروشگاه
                        </Link>
                    </Typography>

                    {UserStatus()}

                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;
