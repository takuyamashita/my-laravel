export const SET_CALENDER_FROM = 'SET_CALENDER_FROM';
export const setCalenderFrom = (from) => {
    return {
        type:'SET_CALENDER_FROM',
        payload:{
            from:from
        }
    }
};

import {getVisibleDayCount} from '../store/initialState';
export const SET_VISIBLEDAY_COUNT = 'SET_VISIBLEDAY_COUNT';
export const setVisibleDayCount = () => {
    const count = getVisibleDayCount();
    return {
        type: 'SET_VISIBLEDAY_COUNT',
        payload:{
            visibleDayCount:count
        }
    };
}