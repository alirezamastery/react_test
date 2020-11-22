import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();

    let history = useHistory();
    const [data, setData] = useState({search: ''});
    const goSearch = (e) => {
        console.log('data.search' , data.search)
        history.push({
            pathname: '/olagh/search/',
            search: '?search=' + data.search
        });
        window.location.reload();
    };

    return (
        <React.Fragment>
            <CssBaseline/>
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
                        <Link
                            component={NavLink}
                            to="/"
                            underline="none"
                            color="textPrimary"
                        >
                            فروشگاه
                        </Link>
                    </Typography>

                    <SearchBar
                        value={data.search}
                        onChange={(newValue) => setData({search: newValue})}
                        onRequestSearch={() => goSearch(data.search)}
                    />

                    <nav>
                        <Link
                            color="textPrimary"
                            href="#"
                            className={classes.link}
                            component={NavLink}
                            to="/register"
                        >
                            ایجاد حساب
                        </Link>
                    </nav>
                    <Button
                        href="#"
                        color="primary"
                        variant="outlined"
                        className={classes.link}
                        component={NavLink}
                        to="/login"
                    >
                        وارد شوید
                    </Button>
                    <Button
                        href="#"
                        color="primary"
                        variant="outlined"
                        className={classes.link}
                        component={NavLink}
                        to="/logout"
                    >
                        خروج
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;
