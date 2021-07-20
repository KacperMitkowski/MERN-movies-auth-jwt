import React from 'react';
import { Button, Grid, Card, CardContent, CardActions, Typography, CardMedia, IconButton } from '@material-ui/core';
import useStyles from './styles';
import MovieModel from '../../../models/Movie';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import noImage from '../../../images/no-image.png';
import { useHistory } from 'react-router-dom';

interface props {
    movie: MovieModel,
}

const Movie = ({ movie }: props) => {
    const classes = useStyles();
    const history = useHistory();
    const charsInPlot = 200;
    const directors = movie?.directors && movie.directors.length > 0 ? movie.directors.join(', ') : 'Director unknown';
    const genres = movie?.genres && movie?.genres.length > 0 ? movie?.genres.join(', ') : 'Genre unknown';
    const plot = movie?.plot && movie?.plot.length > charsInPlot ? `${movie?.plot.substring(0, charsInPlot)}...` : movie?.plot === undefined ? 'No plot given' : movie?.plot;
    const image = movie?.poster ? movie?.poster?.toString() : noImage;
    const userLoggedIn = true;
    const userIsOwner = true;

    const handleDelete = (movie: MovieModel) => {
        alert("DELETE");
    }

    const handleEdit = (movie: MovieModel) => {
        alert("EDIT");
    }

    console.log(movie);

    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card className={classes.root} raised>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>{directors}</Typography>
                    <Typography variant="h6" component="h2" noWrap>{movie.title}</Typography>
                    <Typography className={classes.pos} color="textSecondary">{genres}</Typography>
                    <CardMedia className={classes.media} image={image} title={image} />
                    <Typography component="p" variant="caption" style={{ marginTop: "10px" }}>{plot}</Typography>
                </CardContent>
                <CardActions>
                    {userLoggedIn && userIsOwner &&
                        <>
                            <IconButton aria-label="delete" style={{ position: "absolute", left: "170px", bottom: "2px" }} onClick={() => handleDelete(movie)}>
                                <DeleteIcon fontSize="large" color="secondary" />
                            </IconButton>
                            <IconButton aria-label="edit" style={{ position: "absolute", left: "220px", bottom: "2px" }} onClick={() => handleEdit(movie)}>
                                <EditRoundedIcon fontSize="large" color="secondary" />
                            </IconButton>
                        </>
                    }
                    <Button size="large" color="secondary" variant="contained" className={classes.button} onClick={() => history.push(`/movies/${movie._id}`)}>Details</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Movie;