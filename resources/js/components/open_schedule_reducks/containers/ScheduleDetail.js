/*
import {default as ScheduleDetail} from '../../open_schedule/ScheduleDetail';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../reservations/operations';

const mapStateToProps = (state) =>{
    return {
        reservationsRedux: state.reservations
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: {
            fetchReservations(){
                dispatch(Actions.fetchReservations())
            }
        }
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ScheduleDetail);
*/