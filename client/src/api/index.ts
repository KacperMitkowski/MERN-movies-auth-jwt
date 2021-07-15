import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchMovies = (page: number) => API.get(`/movies?page=${page}`);
export const fetchMovie = (id: any) => API.get(`/movies/${id}`);
