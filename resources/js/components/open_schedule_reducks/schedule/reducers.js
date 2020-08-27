import * as Actions from './actions';
import initialState from '../store/initialState';

export const ScheduleReducer = (state = initialState.schedule,action) =>{
    switch (action.type){
        case Actions.SET_SCHEDULE_CONTEXT:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SET_PASSWORD:
            return{
                ...state,
                ...action.payload
            }
        case Actions.SET_SCHEDULE:
            return{
                ...state,
                ...action.payload
            }
        case Actions.SET_PASSWORD_ERROR:
            return{
                ...state,
                ...action.payload
            }
        case Actions.SET_COLORS:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}