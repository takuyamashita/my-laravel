import {default as ReservaionForm} from '../templates/ReservaionForm';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../forms/actions'
import * as Operations from '../reservations/operations';

const mapStateToProps = (state) =>{
    return {
        permitRequired : state.schedule.permitRequired,
        reserveForm : state.reservationForm.reserveForm,
        reserveFormError : state.reservationForm.reserveFormError,
        colors : state.schedule.colors
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: {
            setOwnerName(name){
                dispatch(Actions.setReservationOwnerName(name));
            },
            setFromForm(from){
                dispatch(Actions.setReservationFrom(from));
            },
            setEndForm(end){
                dispatch(Actions.setReservationEnd(end));
            },
            setColorForm(color){
                dispatch(Actions.setReservationColor(color));
            },
            sendReservation(){
                dispatch(Operations.sendReservation());
            }
        }
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ReservaionForm);