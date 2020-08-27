import * as Actions from './actions';
import initialState from '../store/initialState';

export const CalenderReducer = (state = initialState.calender,action) =>{
    switch (action.type){
        case Actions.SET_CALENDER_FROM:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SET_VISIBLEDAY_COUNT:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}