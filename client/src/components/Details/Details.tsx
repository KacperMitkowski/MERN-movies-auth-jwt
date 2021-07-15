import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getMovie } from '../../actions/movies';



const Details = () => {
    const { movie, movies, isLoading } = useSelector((state : any) => state.movies);
    const dispatch = useDispatch();
    const { id } = useParams<any>();

    useEffect(() => {
        alert(id);
        dispatch(getMovie(id));
    }, [id]);

    return (
        <div>1</div>
    )
}

export default Details;