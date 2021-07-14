import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import Pagination from '../Pagination/Pagination';
import Movies from '../Movies/Movies';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);

    return (
        <Container maxWidth="lg">
            <Movies />
            <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
            </Paper>
        </Container>
    )
}

export default Home;