import {default as Calender} from '../templates/Calender';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../calenders/actions';
import {deleteReservation} from '../reservations/operations';

const mapStateToProps = (state) =>{
    return {
        reservations:state.reservations,
        visibleDayCount:state.calender.visibleDayCount,
        selectDate:state.calender.from,
        owner:state.schedule.owner,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: {
            setVibibleDayCount(){
                dispatch(Actions.setVisibleDayCount());
            },
            deleteReservation(from,end){
                dispatch(deleteReservation(from,end));
            }
        }
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Calender);