import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_MOVIE } from '../constants/actionTypes';

export default (state = { isLoading: true, movies: [] }, action : any) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                movies: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
              };
        case FETCH_MOVIE:
            return { ...state, movie: action.payload.movie };
        default:
            return state;
    }
}