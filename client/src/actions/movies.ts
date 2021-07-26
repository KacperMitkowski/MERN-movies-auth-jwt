import * as api from '../api';
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_MOVIE, CREATE, ERROR, FETCH_BY_SEARCH, UPDATE, UPDATE_SUCCESS } from '../constants/actionTypes';

export const getMovies = (page: number) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchMovies(page);
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
}

export const getMovie = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchMovie(id);

    dispatch({ type: FETCH_MOVIE, payload: { movie: data } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
}

export const getMoviesBySearch = (searchQuery: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchMoviesBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createMovie = (movie, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createMovie(movie);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push('/addMovie');
    }

    dispatch({ type: CREATE, payload: data });
    history.push(`/movies/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = (movie, history) => async (dispatch: any) => {
  try {
    const { data } = await api.updateMovie(movie.movieId, movie);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push('/editMovie');
    }

    dispatch({ type: UPDATE, payload: data });
    return history.push(`/movies/${data._id}`);
  } catch (error) {
    console.log(error);
  }
}