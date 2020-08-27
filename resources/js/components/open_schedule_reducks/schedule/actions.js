export const SET_SCHEDULE_CONTEXT = 'SET_SCHEDULE_CONTEXT';
export const setScheduleContext = (scheduleContextState) =>{
    return{
        type: 'SET_SCHEDULE_CONTEXT',
        payload: {
            hashDigest: scheduleContextState.hashDigest,
            passwordRequired : scheduleContextState.passwordRequired,
        }
    }
};

export const SET_PASSWORD = 'SET_PASSWORD';
export const setPasswordAction = (password) =>{
    return{
        type: 'SET_PASSWORD',
        payload: {
            password: password,
        }
    }
};

export const SET_SCHEDULE = 'SET_SCHEDULE';
export const setSchedule = (schedule) => {
    return{
        type: 'SET_SCHEDULE',
        payload:{
            name:schedule.name,
            description: schedule.description,
            permitRequired:Boolean(schedule.permit_required),
            owner:schedule.owner,
        }
    }
};

export const SET_COLORS = 'SET_COLORS';
export const setColors = (colors) =>{
    return{
        type: 'SET_COLORS',
        payload:{
            colors:colors
        }
    }
}

export const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR';
export const setPasswordError = (error) => {
    return{
        type: 'SET_PASSWORD_ERROR',
        payload:{
            passwordError:error
        }
    }
};

