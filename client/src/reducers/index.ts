import { combineReducers } from 'redux';

import movies from './movies';
import auth from './auth';
import error from './error';
import comments from './comments';

export const reducers = combineReducers({ movies, comments, auth, error });
