import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress, Paper, Grow, Grid, Container, Card, CardContent, Typography, CardMedia, Divider, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Snackbar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { a11yProps } from './TabPanel';
import { useHistory, useParams } from 'react-router-dom';
import { deleteMovie, getMovie } from '../../actions/movies';
import { commentMovie } from '../../actions/comments';
import { getComments } from '../../actions/comments';
import moment from 'moment';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import Comment from '../../models/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TabPanel from './TabPanel';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Alert from '../Helpers/Alert';
import { UPDATE_SUCCESSFUL } from '../../constants/actionTypes';

const Details = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef<any>();
    const history = useHistory();
    
    const { movie, isLoading } = useSelector((state: any) => state.movies);
    const { updateSuccessful } = useSelector((state: any) => state.movies);
    const { comments } = useSelector((state: any) => state.comments);
    const { id } = useParams<any>();
    const profile = localStorage.getItem('profile')!;
    const loggedUser = JSON.parse(profile);
    const directors = movie?.directors && movie.directors.length > 0 ? movie.directors.join(', ') : 'Director unknown';
    const writers = movie?.writers && movie.writers.length > 0 ? movie.writers.join(', ') : 'Writer unknown';
    const genres = movie?.genres && movie?.genres.length > 0 ? movie?.genres.join(', ') : 'Genre unknown';
    const languages = movie?.languages && movie?.languages.length > 0 ? movie?.languages.join(', ') : 'Language unknown';
    const cast = movie?.cast && movie?.cast.length > 0 ? movie?.cast : 'Cast unknown';
    const releaseDate = new Date(movie?.released)?.toLocaleDateString();
    
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState('');
    const [movieComments, setMovieComments] = useState(comments);

    useEffect(() => {
        if (updateSuccessful) {
            setShowEditSuccess(true);
        }
    }, [updateSuccessful]);

    useEffect(() => {
        const getData = async () => {
            await dispatch(getMovie(id));
            const comments = await dispatch(getComments(id));
            setMovieComments(comments);
        }
        getData();
    }, [id]);
    

    if (!movie) return null;
    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper} style={{marginTop: "80px"}}>
                <CircularProgress size="7em" color="secondary" />
            </Paper>
        );
    }

    const handleComment = async () => {
        const name = loggedUser?.result?.name;
        const email = loggedUser?.result?.email;
        const movieId = movie?._id;

        const newComments = await dispatch(commentMovie(`${name}:${comment}:${email}`, movieId));

        setComment('');
        setMovieComments(newComments);
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleCloseEditSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: UPDATE_SUCCESSFUL, payload: false });
        setShowEditSuccess(false);
    }

    const posterSection =
        <Card raised>
            <CardContent style={{ padding: '0' }}>
                {movie?.poster ?
                    <CardMedia className={classes.media} image={movie?.poster} title={movie?.poster}></CardMedia>
                    :
                    <div style={{ height: '500px' }}><PhotoOutlinedIcon style={{ width: "100%", height: "100%" }} /></div>}
            </CardContent>
        </Card>

    const contentSection =
        <Card raised>
            <CardContent>
                <Typography variant="h4" align="center">{movie?.title}</Typography>
                <div className={classes.starsDiv}>
                    <Rating readOnly name="half-rating" defaultValue={movie?.imdb?.rating} precision={0.5} size="large" max={10} style={{ marginTop: '2px' }} />
                    <Typography variant="h5" style={{ marginLeft: '5px' }}>({movie?.imdb?.rating})</Typography>
                    <Typography className={classes.votes}>{movie?.imdb?.votes} <br />votes</Typography>
                </div>
                <Typography>{movie?.plot}</Typography>
                {loggedUser && Object.keys(loggedUser).length !== 0 && loggedUser?.result?._id === movie?.userId &&
                    <div style={{ display: "flex", marginTop: '10px', justifyContent: 'space-between' }}>
                        <Button color="secondary" variant="outlined" onClick={() => dispatch(deleteMovie(movie._id, history))} >DELETE</Button>
                        <Button color="secondary" variant="outlined" onClick={() => history.push(`/editMovie/${movie?._id}`)} >EDIT</Button>
                    </div>
                }
                <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
                <Accordion classes={{ expanded: classes.accordionActive }} className={classes.accordionHover}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Directors:</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{directors}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion classes={{ expanded: classes.accordionActive }} className={classes.accordionHover}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Writers:</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{writers}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion classes={{ expanded: classes.accordionActive }} className={classes.accordionHover}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Genres:</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{genres}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion classes={{ expanded: classes.accordionActive }} className={classes.accordionHover}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Release:</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{releaseDate}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion classes={{ expanded: classes.accordionActive }} className={classes.accordionHover}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Runtime:</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{movie?.runtime} minutes</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion classes={{ expanded: classes.accordionActive }} className={classes.accordionHover}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Languages:</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{languages}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion classes={{ expanded: classes.accordionActive }} className={classes.accordionHover}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Cast:</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{cast?.map((item: any, index: number) => (
                            <React.Fragment key={index}><strong>{index + 1}.</strong> {item}<br /></React.Fragment>
                        ))}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion classes={{ expanded: classes.accordionActive }} className={classes.accordionHover}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Awards:</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'block' }}>
                        <Tabs value={value} indicatorColor="secondary" textColor="secondary" onChange={(event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue)} centered>
                            <Tab label="Nominations" icon={<EventNoteIcon />} {...a11yProps(0)} style={{ width: '50%' }} />
                            <Tab label="Wins" icon={<FavoriteIcon />} {...a11yProps(1)} style={{ width: '50%' }} />
                        </Tabs>
                        <TabPanel value={value} index={0}>nominations: 0</TabPanel>
                        <TabPanel value={value} index={1}>{movie?.awards?.text}</TabPanel>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card >

    const commentsSection =
        <Card raised style={{ height: '500px' }}>
            <CardContent>
                <div className={classes.commentsUpperContainer} style={loggedUser && Object.keys(loggedUser).length !== 0 ? {height: "200px"} : {height: "400px"}}>
                    <Typography gutterBottom variant="h6">Comments ({movieComments?.length}):</Typography>
                    {movieComments?.length === 0 && <Typography className={classes.noCommentsTypography}>No comments so far...</Typography>}
                    {movieComments?.map((c: Comment, i: number) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.name}: </strong>
                            {c.text}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                <div style={{margin: "15px"}}></div>
                {loggedUser && Object.keys(loggedUser).length !== 0 ?
                    <div className={classes.commentsLowerContainer}>
                        <Typography gutterBottom variant="h6">Vote:</Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size="small" max={10} />
                        <Typography gutterBottom variant="h6">Write a comment:</Typography>
                        <TextField value={comment} onChange={(e : any) => setComment(e.target.value)} fullWidth rows={4} variant="outlined" color="secondary" label="Comment" multiline />
                        <br />
                        <Button fullWidth color="secondary" variant="contained" onClick={handleComment}>Comment</Button>
                    </div>
                    :
                    <div className={classes.commentsLowerContainer}>
                        <Typography variant="subtitle2" gutterBottom>Only logged users can comment</Typography>
                        <Button fullWidth color="secondary" variant="contained" onClick={() => history.push('/loginUser')}>Sign in</Button>
                    </div>
                }
            </CardContent>
        </Card>

    const lastActionDiv =
        <div className={classes.updateOrCreateDiv}>
            <div>Created: {moment(movie?.lastupdated).fromNow()}</div>
            <div>Last action: {moment(movie?.lastUpdated).fromNow()}</div>
        </div>

    return (
        <Container style={{marginTop: "80px"}}>
            {lastActionDiv}
            <Grow in timeout={{ enter: 1500 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>{posterSection}</Grid>
                    <Grid item xs={12} sm={6}>{contentSection}</Grid>
                    <Grid item xs={12} sm={3}>{commentsSection}</Grid>
                </Grid>
            </Grow>

            <Snackbar open={showEditSuccess} autoHideDuration={6000} onClose={handleCloseEditSuccess}>
                <Alert onClose={handleCloseEditSuccess} severity="success">Edit successful</Alert>
            </Snackbar>
        </Container>
    )
}

export default Details;