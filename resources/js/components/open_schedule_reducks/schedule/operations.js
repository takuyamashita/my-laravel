import {setScheduleName,setPasswordError, setColors, setScheduleContext,setSchedule as setScheduleAction} from './actions';
import {setReservations} from '../reservations/actions';
import {setPasswordLoading} from '../loading/actions';
import {fetchFromLaravel} from '../../FetchUtil';

export const setSchedule = () => {
    return (dispatch,getState) => {
        const state = getState();
        const csrf = document.querySelector('meta[name="csrf_token"]').content;

        fetchFromLaravel(csrf,'POST',`/${state.schedule.hashDigest}`,{schedule_password:state.schedule.password},
            res=>{
                dispatch(setScheduleContext({
                    hashDigest:state.schedule.hashDigest,
                    passwordRequired:false,
                }))
                dispatch(setScheduleAction(res));
                dispatch(setColors(res.color_root.colors));
                dispatch(setReservations(res.reservations));
                dispatch(setPasswordLoading(true));
            },
            res=>{
                dispatch(setPasswordError(res.error));
                dispatch(setPasswordLoading(false));
            }
        );

    };
};