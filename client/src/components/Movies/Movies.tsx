import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Grow, Paper } from '@material-ui/core';
import MovieModel from '../../models/Movie';
import Movie from './Movie/Movie';
import useStyles from './styles';


const Movies = () => {
    const { movies, isLoading } = useSelector((state: any) => state.movies);
    const classes = useStyles();

    if (!movies.length && !isLoading) return <>'No movies'</>;

    return (
        isLoading ?
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" color="secondary" value={100} />
            </Paper>
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