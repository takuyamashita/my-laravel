import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';


class PasswordAuth extends React.Component{
    constructor(props){
        super(props);
        this.errorStyle = {
            width:'100%',
            marginTop:'0.25rem',
            fontSize:'80%',
            color:'#e3342f'
        }
    }
    render(){
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                パスワードが必要です
                            </div>
                            <div className="card-body">
                                <div className="form-group" >
                                    <label htmlFor="schedule_password">パスワード</label>
                                    <input type="password" className="form-control" value={this.props.schedule_password} id="schedule_password" placeholder="Password" aria-describedby="schedule_passwordHelp"onChange={this.props.changePassword}/>
                                    {this.props.schedule_password_error.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.schedule_password_error}</strong></span>)}
                                    <small id="schedule_passwordHelp" className="form-text text-muted">閲覧に必要なパスワードを入力</small>
                                    <button id="sendScheduleButton" className="btn btn-primary center-block mx-auto d-block" onClick={this.props.sendPassword}>送信</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PasswordAuth);