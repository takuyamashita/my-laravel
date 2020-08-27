import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';

import PasswordAuth from './PasswordAuth';
import ScheduleDetail from './ScheduleDetail';


import {formatDate} from '../DateUtil';
import {fetchFromLaravel} from '../FetchUtil';



class ScheduleRoot extends React.Component{
    constructor(props){
        super(props);
        this.currentDate = new Date();
        this.currentDate.setMinutes(0);
        this.state = {
            auth_button_disable:false,
            password_required : this.props.passwordRequired,
            schedule_password : null,
            schedule_password_error : '',
            schedule_name : null,
            schedule_description : null,
            colors : [],
            reservations : [],
            reserveForm : {
                owner_name:'',
                from : '',
                end : '',
                color: '',
            },
            reserveFormError : {
                owner_name:'',
                from : '',
                end : '',
                over : '',
                color :'',
            },
            from : this.currentDate,
            end : new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate(),this.currentDate.getHours() + 1)
        }
        this.csrf = document.querySelector('meta[name="csrf_token"]').content;
        this.dummyId = 0;
    }

    componentDidMount(){
        if(!this.props.passwordRequired){
            this.scheduleAuth();
        }
    }

    scheduleAuth(){
        this.setState({auth_button_disable:true});
        fetchFromLaravel(this.csrf,'POST',`/${this.props.hashDigest}`,{ schedule_password:this.state.schedule_password },
            res=>{
                this.setColors(res.color_root.colors);
                this.setSchedule(res);
                this.setState({password_required:false});
            },
            error=>{
                this.setState({schedule_password_error:error.error,auth_button_disable:false});
            }
        );
    }

    createReservation(owner_name,from,end,color){

        this.dummyId ++;

        const body = {
            schedule_password : this.state.schedule_password,
            hash_digest : this.props.hashDigest,
            owner_name : owner_name,
            from : formatDate(from,'YYYY-MM-DD HH:mm:00'),
            end : formatDate(end,'YYYY-MM-DD HH:mm:00'),
            color : Number(color),
            dummyId : this.dummyId
        };

        const target = this.state.reservations;
        const selectedColor = this.state.colors.find(color=>color.id === body.color);
        const dummyReservation = Object.assign({},body);

        dummyReservation.color = {
            background_color : selectedColor.background_color,
            text_color : selectedColor.text_color
        };
        target.push(dummyReservation);
        this.setState({reservations:target});
        
        fetchFromLaravel(this.csrf,'POST',`/reservations`,body,
            res=>{
                console.log(res);
                const newReservations = this.state.reservations.filter(reservation=>{
                    return !('dummyId' in reservation) || reservation.dummyId !== res.dummyId;
                })
                newReservations.push(res.reservation);
                this.setState({reservations:newReservations});
            },
            this.reservationErrorCallback.bind(this)
        );
    }

    reservationErrorCallback(res){
        let deleteReservation;
        const reserveFormError = this.state.reserveFormError;

        reserveFormError.over = '重複している予約があります';

        const newReservations = this.state.reservations.filter(reservation=>{
            if('dummyId' in reservation && reservation.dummyId === res.errors.dummyId[0]){
                deleteReservation = reservation;
                return false;
            }
            return true;
        })

        delete deleteReservation.dummyId;

        this.setState({
            reservations:newReservations,
            reserveFormError:reserveFormError,
            from:new Date(...deleteReservation.from.split(/-|\s|:/)),
            end:new Date(...deleteReservation.end.split(/-|\s|:/))
        });
        document.getElementById('open-form-button').click();
        document.getElementById('open-form-button').scrollIntoView();
    }

    setFromForm(ev){
        switch (ev.currentTarget.id){
            case 'reserve-form-from-year':
                this.state.from.setFullYear(Number(ev.target.value));
                break;
            case 'reserve-form-from-month':
                this.state.from.setMonth(Number(ev.target.value));
                break;
            case 'reserve-form-from-date':
                this.state.from.setDate(Number(ev.target.value));
                break;
            case 'reserve-form-from-hour':
                this.state.from.setHours(Number(ev.target.value));
                break;
            case 'reserve-form-from-minute':
                this.state.from.setMinutes(Number(ev.target.value));
                break;
        }
        this.setState({from:this.state.from});
    }
    setEndForm(ev){
        switch (ev.currentTarget.id){
            case 'reserve-form-end-year':
                this.state.end.setFullYear(Number(ev.target.value));
                break;
            case 'reserve-form-end-month':
                this.state.end.setMonth(Number(ev.target.value));
                break;
            case 'reserve-form-end-date':
                this.state.end.setDate(Number(ev.target.value));
                break;
            case 'reserve-form-end-hour':
                this.state.end.setHours(Number(ev.target.value));
                break;
            case 'reserve-form-end-minute':
                this.state.end.setMinutes(Number(ev.target.value));
                break;
        }
        this.setState({end:this.state.end});
    }

    formMethod(key,value){
        const target = this.state.reserveForm;
        target[key] = value;
        this.setState({reserveForm:target});
    }

    errorMethod(key,value){
        const target = this.state.reserveFormError;
        target[key] = value;
        this.setState({reserveFormError:target});
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
                                    auth_button_disable={this.state.auth_button_disable}
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
                                    from={this.state.from}
                                    end={this.state.end}
                                    formMethod={this.formMethod.bind(this)} 
                                    errorMethod={this.errorMethod.bind(this)}
                                    setFromForm={this.setFromForm.bind(this)}
                                    setEndForm={this.setEndForm.bind(this)}
                                    reserveForm={this.state.reserveForm}
                                    reserveFormError={this.state.reserveFormError} 
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
    ReactDOM.render(
        <ScheduleRoot passwordRequired={element.dataset.passwordRequired === '1' ? true:false} hashDigest={element.dataset.hashDigest} />,
        document.getElementById('open-schedule-root')
    );
}