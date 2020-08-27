
export const SET_RESERVATION_OWNER_NAME = 'SET_RESERVATION_OWNER_NAME';
export const setReservationOwnerName = (name) => {
    return {
        type:'SET_RESERVATION_OWNER_NAME',
        payload:{
            owner_name:name
        }
    };
}

export const SET_RESERVATION_FROM = 'SET_RESERVATION_FROM';
export const setReservationFrom = (from) => {
    return {
        type:'SET_RESERVATION_FROM',
        payload:{
            from:from
        }
    };
}

export const SET_RESERVATION_END = 'SET_RESERVATION_END';
export const setReservationEnd = (end) => {
    return {
        type:'SET_RESERVATION_END',
        payload:{
            end:end
        }
    };
}

export const SET_RESERVATION_COLOR = 'SET_RESERVATION_COLOR';
export const setReservationColor = (color) => {
    return {
        type:'SET_RESERVATION_COLOR',
        payload:{
            color:color
        }
    }
}

export const SET_RESERVATION_ERROR = 'SET_RESERVATION_ERROR';
export const setReservationError = (error) => {
    return {
        type:'SET_RESERVATION_ERROR',
        payload:error
    }
}