import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';


class ScheduleDetailCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="card mx-auto mt-5" style={{width:'90%'}}>
                <div className="card-body">
                    <h2 className="card-title">{this.props.schedule.name}</h2>
                    <h5 className="card-subtitle mt-4 text-muted">
                        {this.props.schedule.description !== null && this.props.schedule.description.split('\n').map(line=><p>{line}</p>)}
                    </h5>
                    {this.props.schedule.password_required === 1 && (
                        <div className="row mt-2 mb-3">
                            {this.props.schedule.schedule_passwords.map(passwordObject=>
                                <div key={passwordObject.password} className="mt-2 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{passwordObject.password}</h5>
                                            <div className="d-flex justify-content-around flex-wrap">
                                                {passwordObject.colors.map(color=>
                                                    <button key={color.id} type="button" className='btn mt-1' style={{background:color.background_color,color:color.text_color}}>Text</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <label htmlFor="schedule-detail-card-url">公開URL</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon3">{`${location.protocol}//${location.hostname}/`}</span>
                        </div>
                        <input type="text" id="schedule-detail-card-url" className="form-control" aria-describedby="basic-addon3" value={`${this.props.schedule.hash_digest}`} readOnly={true}/>
                    </div>
                    <a href={`/${this.props.schedule.hash_digest}`}>
                        <span className="display-5">確認</span>
                    </a>
                    {/*
                    <Link to='/myschedule/make' className="ml-5" onClick={()=>this.props.editClick(this.props.schedule)}>
                        <span className="display-5">編集</span>
                    </Link>
                    */}
                </div>
            </div>
        );
    }
}

export default withRouter(ScheduleDetailCard);