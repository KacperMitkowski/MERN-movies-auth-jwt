import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies';
import Paginate from '../Pagination/Paginate';
import { useDispatch } from 'react-redux';
import { getMovies } from '../../actions/movies';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const query = useQuery();
    const page = query.get('page') || 1;
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) {
          dispatch(getMovies(Number(page)));
        }
      }, [dispatch, page]);

    return (
        <Container maxWidth="lg">
            <Paginate page={page} />
            <Movies />
            <Paginate page={page} />
        </Container>
    )
}

export default Home;