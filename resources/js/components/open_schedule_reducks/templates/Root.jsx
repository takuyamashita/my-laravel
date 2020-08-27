import React from 'react';
import {default as PasswordForm} from '../containers/PasswordForm';
import {default as Schedule} from '../containers/Schedule';


class Root extends React.Component{
    
    componentDidMount(){
        if(!this.props.schedule.passwordRequired) this.props.actions.setSchedule();
    }

   
    render(){
        return (
            <div className="mb-5" >
                {this.props.schedule.passwordRequired ? <PasswordForm/> : <Schedule/>}
            </div>
        );
    }

}

export default Root;

