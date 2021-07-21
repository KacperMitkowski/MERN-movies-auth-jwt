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
   else if(error.response.status === 400) {
       alert("WRONG LOGIN OR PASSWORD");
   }
   return error;
 });

export const fetchMovies = (page: number) => API.get(`/movies?page=${page}`);
export const fetchMovie = (id: any) => API.get(`/movies/${id}`);
export const signIn = (formData: any) => API.post('/user/signin', formData);
export const signUp = (formData: any) => API.post('/user/signup', formData);