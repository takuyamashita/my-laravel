import {default as CalenderSelect} from '../templates/CalenderSelect';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../calenders/actions';

const mapStateToProps = (state) =>{
    return {
        selectedDate:state.calender.from
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: {
            setCalenderFrom(from){
                dispatch(Actions.setCalenderFrom(from));
            }
        }
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(CalenderSelect);