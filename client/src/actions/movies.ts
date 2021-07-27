import * as api from '../api';
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_MOVIE, CREATE, ERROR, FETCH_BY_SEARCH, UPDATE, DELETE, DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL } from '../constants/actionTypes';

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

    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE, payload: data });
    history.push(`/movies/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = (movie, history) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateMovie(movie.movieId, movie);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push('/editMovie');
    }

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: UPDATE_SUCCESSFUL, payload: true});
    dispatch({ type: END_LOADING });
    return history.push(`/movies/${data._id}`);
  } catch (error) {
    console.log(error);
  }
}

export const deleteMovie = (id, history) => async (dispatch : any) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteMovie(id);

    dispatch({ type: DELETE, payload: id });
    dispatch({ type: DELETE_SUCCESSFUL, payload: true});
    dispatch({ type: END_LOADING });
    return history.push(`/movies`); 
  } catch (error) {
    console.log(error);
  }
};
