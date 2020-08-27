import * as Actions from './actions';
import initialState from '../store/initialState';

export const LoadingReducer = (state = initialState.loadings,action) =>{
    switch (action.type){
        case Actions.SET_PASSEORD_LOADING:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}