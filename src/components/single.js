import React, {useState, useEffect} from 'react';
import axiosInstance from '../axios';
import {useParams} from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import {useFetch} from "../lookup/components";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));


export default function Product() {
    const {slug} = useParams();
    const classes = useStyles();

    const [data, setData] = useState({posts: []});

    // useEffect(() => {
    //     axiosInstance.get("products/" + slug).then((res) => {
    //         setData({posts: res.data});
    //     });
    // }, [setData]);

    const callback = (response) => {
        setData(response)
    }

    const url = `http://127.0.0.1:8000/api/products/${slug}`
    useFetch(url, callback)  //TODO create our own API calling function with error handling

    console.log('data',data)

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <div className={classes.paper}></div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <img src={data.image}/>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        {data.name}
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        {data.description}
                    </Typography>
                </Container>
            </div>
        </Container>
    );
}
