import { combineReducers } from 'redux';

import movies from './movies';
import auth from './auth';
import error from './error';

export const reducers = combineReducers({ movies, auth, error });
