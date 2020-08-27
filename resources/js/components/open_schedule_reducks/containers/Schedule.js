import {default as Schedule} from '../templates/Schedule';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../schedule/actions';
import * as Operations from '../schedule/operations';

const mapStateToProps = (state) =>{
    return {
        schedule:state.schedule
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: {
            
        }
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Schedule);