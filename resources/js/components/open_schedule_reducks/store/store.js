import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import {ScheduleReducer} from '../schedule/reducers';
import {ReservationsReducer} from '../reservations/reducers';
import {CalenderReducer} from '../calenders/reducers';
import {ReservationFormReducer} from '../forms/reducers';
import {LoadingReducer} from '../loading/reducers';

export default function createStore(){
    return reduxCreateStore(
        combineReducers({
            schedule : ScheduleReducer,
            reservations: ReservationsReducer,
            calender : CalenderReducer,
            reservationForm:ReservationFormReducer,
            loadings:LoadingReducer,
        }),
        applyMiddleware(
            thunk
        )
    );
}
