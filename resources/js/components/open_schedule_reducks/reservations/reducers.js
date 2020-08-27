import * as Actions from './actions';
import initialState, {} from '../store/initialState';

export const ReservationsReducer = (state = initialState.reservations,action) => {
    switch (action.type){
        case Actions.SET_RESERVATIONS:
            return [
                ...state,
                ...action.reservations
            ];
        case Actions.ALL_RESERVATIONS:
            return [
                ...action.reservations
            ];
        default:
            return state;
    }
}