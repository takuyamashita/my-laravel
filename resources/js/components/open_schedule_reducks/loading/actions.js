export const SET_PASSEORD_LOADING = 'SET_PASSEORD_LOADING';
export const setPasswordLoading = (bool) =>{
    return{
        type: 'SET_PASSEORD_LOADING',
        payload: {
            password:bool
        }
    }
};