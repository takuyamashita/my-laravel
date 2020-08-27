export const SET_RESERVATIONS = 'SET_RESERVATIONS';
export const setReservations = (reservations) => {
    return {
        type:'SET_RESERVATIONS',
        reservations
    };
}

export const ALL_RESERVATIONS = 'ALL_RESERVATIONS';
export const allReservations = (reservations) => {
    return {
        type:'ALL_RESERVATIONS',
        reservations
    };
}