import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Grid, Paper, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getMovies } from '../../actions/movies';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';



const Movies = () => {
    const { movies, isLoading } = useSelector((state : any) => state.movies);
    const classes = useStyles();

    return (
        !movies.length ? <CircularProgress /> : (
            <Grid container spacing={3}>
                {
                    movies.map((movie: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <Paper className={classes.paper}>{movie.fullplot}</Paper>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Movies;