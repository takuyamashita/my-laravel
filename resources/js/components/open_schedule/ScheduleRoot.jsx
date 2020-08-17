import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';

import PasswordAuth from './PasswordAuth';
import ScheduleDetail from './ScheduleDetail';

import {formatDate} from '../DateUtil';

class ScheduleRoot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password_required : this.props.passwordRequired,
            schedule_password : null,
            schedule_password_error : '',
            schedule_name : null,
            schedule_description : null,
            colors : [],
            reservations : []
        }
    }

    componentDidMount(){
        if(!this.props.passwordRequired){
            this.scheduleAuth();
        }
    }


    fetchFromServer(method,endPoint,body,callback){
        fetch(endPoint,{
            headers:{
                'Content-Type':"application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector('meta[name="csrf_token"]').content
            },
            method: method,
            credentials: "same-origin",
            body: JSON.stringify(body)
        }).then(res=>{
            return res.json();
        }).then(res=>{
            callback(res);
        })
    }

    scheduleAuth(){
        this.fetchFromServer('POST',`/${this.props.hashDigest}`,{ schedule_password:this.state.schedule_password },res=>{
            if('error' in res){
                this.setState({schedule_password_error:res.error});
            }else{
                this.setColors(res.color_root.colors);
                this.setSchedule(res);
                this.setState({password_required:false});
            }
        });
    }

    createReservation(owner_name,from,end,color){
        const body = {
            schedule_password : this.state.schedule_password,
            hash_digest : this.props.hashDigest,
            owner_name : owner_name,
            from : formatDate(from,'YYYY-MM-DD HH:mm:00'),
            end : formatDate(end,'YYYY-MM-DD HH:mm:00'),
            color : Number(color)
        };
        this.fetchFromServer('POST',`/reservations`,body,res=>{
            if('error' in res){
                console.log(res);
            }else{
                console.log(res);
            }
        });
    }

    setColors(colors){
        this.setState({colors:colors.map(color=>{
            return {
                id                  :   color.id,
                background_color    :   color.background_color,
                text_color          :   color.text_color
            };
        })});
    }

    setSchedule(schedule){
        /*
            name:,
            reservations:[
                {
                    owner_name:
                    from:
                    end:
                } ......
            ]
        */
        this.setState({
            schedule_name:schedule.name,
            schedule_description:schedule.description
        });
        this.setState({reservations:schedule.reservations});
    }

    changePassword(ev){this.setState({schedule_password:ev.currentTarget.value})}

    render(){
        return (
            <Router>
                <div className="mb-5">
                    {this.state.password_required
                        ? 
                            <Route 
                                path="/:hash([a-z0-9]{64})"
                                exact
                                render={props => <PasswordAuth
                                    schedule_password={this.state.password}
                                    schedule_password_error={this.state.schedule_password_error}
                                    sendPassword={this.scheduleAuth.bind(this)}
                                    changePassword={this.changePassword.bind(this)} {...props}/>}
                            />
                        :
                            <Route 
                                path="/:hash([a-z0-9]{64})"
                                exact
                                render={props => <ScheduleDetail 
                                    schedule_name={this.state.schedule_name}
                                    schedule_description={this.state.schedule_description}
                                    colors={this.state.colors} 
                                    createReservation={this.createReservation.bind(this)}   
                                    reservations={this.state.reservations}
                                    {...props}/>}
                            />
                    }
                    
                </div>
            </Router>
        );
    }

}

export default withRouter(ScheduleRoot);

if (document.getElementById('open-schedule-root')) {
    const element = document.getElementById('open-schedule-root');
    ReactDOM.render(<ScheduleRoot passwordRequired={element.dataset.passwordRequired === '1' ? true:false} hashDigest={element.dataset.hashDigest} />, document.getElementById('open-schedule-root'));
}