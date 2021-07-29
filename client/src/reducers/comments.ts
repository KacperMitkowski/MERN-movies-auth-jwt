import * as actionType from '../constants/actionTypes';


const commentsReducer = (state = [], action: any) => {
    switch (action.type) {
        case actionType.FETCH_COMMENTS:
            return { ...state, comments: action.payload };
        default:
            return state;
    }
};

export default commentsReducer;
