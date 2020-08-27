import * as Actions from './actions';
import initialState from '../store/initialState';

export const ReservationFormReducer = (state = initialState.reservationForm,action) => {
    switch (action.type){
        case Actions.SET_RESERVATION_OWNER_NAME:
            return{
                ...state,
                reserveForm:{
                    ...state.reserveForm,
                    ...action.payload
                }
            };
        case Actions.SET_RESERVATION_FROM:
            return {
                ...state,
                reserveForm:{
                    ...state.reserveForm,
                    ...action.payload
                }
            };
        case Actions.SET_RESERVATION_END:
            return {
                ...state,
                reserveForm:{
                    ...state.reserveForm,
                    ...action.payload
                }
            };
        case Actions.SET_RESERVATION_COLOR:
            return {
                ...state,
                reserveForm:{
                    ...state.reserveForm,
                    ...action.payload
                }
            };
        case Actions.SET_RESERVATION_ERROR:
            return {
                ...state,
                reserveFormError:{
                    ...state.reserveFormError,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}