import * as api from '../api';
import { COMMENT, FETCH_COMMENTS } from '../constants/actionTypes';

export const getComments = (id: any) => async (dispatch: any) => {
    try {
      const { data } = await api.fetchComments(id);
      console.log(data);
      dispatch({ type: FETCH_COMMENTS, payload: data });
      return data;
    }
    catch (error) {
      console.log(error);
    }
  }

  export const commentMovie = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
      console.log(data);
      dispatch({ type: COMMENT, payload: data });
  
      return data;
    }
    catch(error) {
      console.log(error);
    }
  }