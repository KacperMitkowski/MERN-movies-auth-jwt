import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Grow } from '@material-ui/core';
import MovieModel from '../../models/Movie';
import Movie from './Movie/Movie';
import useStyles from './styles';


const Movies = () => {
    const { movies, isLoading } = useSelector((state: any) => state.movies);
    const classes = useStyles();

    // if (!movies.length && !isLoading) return <>'No movies'</>;

    return (
        isLoading ? <CircularProgress /> : (
            <Grow in={true} timeout={{ enter: 1500 }}>
                <Grid container spacing={3}>
                    {movies?.map((movie: MovieModel, index: number) => (
                        <Movie movie={movie} key={index} />
                    ))}
                </Grid>
            </Grow>
        )
    )
}

export default Movies;