import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Grow, Paper, Button } from '@material-ui/core';
import MovieModel from '../../models/Movie';
import Movie from './Movie/Movie';
import useStyles from './styles';
import { Alert } from '@material-ui/lab';


const Movies = () => {
    const { movies, isLoading } = useSelector((state: any) => state.movies);
    const classes = useStyles();

    if (!movies.length && !isLoading) return (
        <Grid container spacing={3}>
            <Alert severity="error" style={{ width: "100%" }}>No movies found</Alert>
        </Grid>)

    return (
        isLoading ?
            <Grid container spacing={3}>
                <Paper elevation={6} className={classes.loadingPaper}>
                    <CircularProgress size="7em" color="secondary" value={100} />
                </Paper>
            </Grid>
            :
            <Grow in={true} timeout={{ enter: 1500 }}>
                <Grid container spacing={3}>
                    {movies?.map((movie: MovieModel, index: number) => (
                        <Movie movie={movie} key={index} />
                    ))}
                </Grid>
            </Grow>
    )
}

export default Movies;