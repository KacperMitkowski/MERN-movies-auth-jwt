import { AUTH, ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData: any, router: any) => async (dispatch: any) => {
    try {
        const { data } = await api.signIn(formData);
        if(data?.error) {
            dispatch({ type: ERROR, data });
            return router.push('/auth'); 
        }
        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData: any, router: any) => async (dispatch: any) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        console.log(error);
    }
};
