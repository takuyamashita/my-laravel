import React from 'react';

export default class PasswordForm extends React.Component{
    render(){
        const errorStyle = {
            width:'100%',
            marginTop:'0.25rem',
            fontSize:'80%',
            color:'#e3342f'
        };
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
                                    <input type="password" className="form-control" value={this.props.schedule.password} id="schedule_password" placeholder="Password" aria-describedby="schedule_passwordHelp" onChange={(ev)=>this.props.actions.setPassword(ev)}/>
                                    {this.props.schedule.passwordError.length > 0 && (<span style={errorStyle} role="alert"><strong>{this.props.schedule.passwordError}</strong></span>)}
                                    <small id="schedule_passwordHelp" className="form-text text-muted">閲覧に必要なパスワードを入力</small>
                                    {this.props.loading ?
                                    <div style={{height:'5em',width:'5em'}} className="center-block mx-auto d-block password-loading"></div>
                                    :
                                    <button id="sendScheduleButton" className="btn btn-primary center-block mx-auto d-block"
                                        onClick={()=>{
                                            this.props.actions.sendPassword();
                                            this.props.actions.setLoading(true);
                                        }}>
                                        送信
                                    </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}