import {default as PasswordForm} from '../templates/PasswordForm';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../schedule/actions';
import * as Operations from '../schedule/operations';
import * as LoadingActions from '../loading/actions';

const mapStateToProps = (state) =>{
    return {
        schedule:state.schedule,
        loading:state.loadings.password,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: {
            setPassword(ev){
                dispatch(Actions.setPasswordAction(ev.target.value));
            },
            sendPassword(){
                dispatch(Operations.setSchedule());
            },
            setLoading(bool){
                dispatch(LoadingActions.setPasswordLoading(bool));
            }
        }
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(PasswordForm);