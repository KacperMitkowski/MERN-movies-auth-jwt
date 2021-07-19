import { CircularProgress, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getMovie } from '../../actions/movies';
import useStyles from './styles';


const Details = () => {
    const { movie, movies, isLoading } = useSelector((state: any) => state.movies);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams<any>();

    useEffect(() => {
        dispatch(getMovie(id));
    }, [id]);

    console.log(movie);


    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    return (
        <div>{movie?.title}</div>
    )
}

export default Details;