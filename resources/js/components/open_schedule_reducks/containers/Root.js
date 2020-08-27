import {default as Root} from '../templates/Root';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../schedule/actions';
import {setSchedule as setScheduleAction} from '../schedule/operations';

const mapStateToProps = (state) =>{
    return {
        schedule:state.schedule
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: {
            setScheduleContext(hashDigest,passwordRequired){
                dispatch(Actions.setScheduleContext(hashDigest,passwordRequired));
            },
            setSchedule(){
                dispatch(setScheduleAction());
            }
        }
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Root);
