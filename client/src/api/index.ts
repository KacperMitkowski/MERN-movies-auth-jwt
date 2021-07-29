import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        const profile = localStorage.getItem('profile') || '';
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }

    return req;
});


API.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
        window.location.assign('/unauthorized');
   }
   else if(error.response.status === 500) {
       alert("Server error");
   }
   return error;
   
 });
 

export const fetchMovies = (page) => API.get(`/movies?page=${page}`);
export const fetchMovie = (id) => API.get(`/movies/${id}`);
export const fetchMoviesBySearch = (searchQuery) => API.get(`/movies/search?searchQuery=${searchQuery.search || 'none'}&genres=${searchQuery.genres}`);
export const createMovie = (movie) => API.post('/movies', movie);
export const updateMovie = (id, updatedMovie) => API.patch(`/movies/${id}`, updatedMovie);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

export const fetchComments = (movieId) => API.get(`/comments/${movieId}`);
export const comment = (value, movieId) => API.post(`/comments/${movieId}/commentMovie`, { value });

export const signIn = (formData: any) => API.post('/user/signin', formData);
export const signUp = (formData: any) => API.post('/user/signup', formData);
