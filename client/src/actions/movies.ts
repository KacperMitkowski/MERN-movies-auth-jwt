import * as api from '../api';
import { START_LOADING, END_LOADING, FETCH_ALL } from '../constants/actionTypes';

export const getMovies = (page: number) => async (dispatch : any) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchMovies(page);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    }
    catch(error) {
        console.log(error);
    }
}