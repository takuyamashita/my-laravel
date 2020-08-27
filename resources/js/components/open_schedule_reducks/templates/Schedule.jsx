import React from 'react'
import {default as CalenderSelect} from '../containers/CalenderSelect';
import {default as Calender} from '../containers/Calender';
import {default as ReservationForm} from '../containers/ReservationForm';

export default class Schedule extends React.Component{


    render(){
        return(
            <div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">{this.props.schedule.name}</div>
                                <div className="card-body">
                                    {this.props.schedule.description !== null && this.props.schedule.description.length > 0 && (
                                        <h5 className="card-title">
                                            {this.props.schedule.description.split('\n').map((line,i)=><p key={i}>{line}</p>)}
                                        </h5>
                                    )}
                                    <ReservationForm/>
                                    <CalenderSelect/>
                                    <Calender/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}