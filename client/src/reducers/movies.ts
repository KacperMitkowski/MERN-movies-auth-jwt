import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_MOVIE, CREATE, FETCH_BY_SEARCH, UPDATE, DELETE, DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL } from '../constants/actionTypes';

export default (state = { isLoading: true, movies: [] }, action: any) => {
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
        case FETCH_BY_SEARCH:
            return { ...state, movies: action.payload.data };
        case FETCH_MOVIE:
            return { ...state, movie: action.payload.movie };
        case CREATE:
            return { ...state, movies: [...state.movies, action.payload] };
        case UPDATE:
            return { ...state, movies: state.movies.map((movie) => (movie._id === action.payload._id ? action.payload : movie)) };
        case UPDATE_SUCCESSFUL:
            return { ...state, updateSuccessful: action?.payload };
        case DELETE:
            return { ...state, movies: state.movies.filter((movie) => movie._id !== action.payload) };
        case DELETE_SUCCESSFUL:
            return { ...state, deleteSuccessful: action?.payload };
        default:
            return state;
    }
}