import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';


let csrf = '';

class ScheduleMake extends React.Component{
    constructor(props){
        super(props);
        this.state = props.state;
        this.errorStyle = {
            width:'100%',
            marginTop:'0.25rem',
            fontSize:'80%',
            color:'#e3342f'
        }
    }
    componentDidMount(){
        document.getElementById('sendScheduleButton').addEventListener('click',()=>{
            if(this.props.validate()) return;
            this.sendSchedule();
            this.props.addCreatedSchedule();
            this.props.history.push('/myschedule');
        },{once:false});
    }
    sendSchedule(){
        const endPoint = this.props.editTarget.length > 0 ? `/schedules/${this.props.editTarget}`:'/schedules';
        const method = this.props.editTarget.length > 0 ? `PUT`:'POST';
        fetch(endPoint,{
            headers:{
                'Content-Type':"application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-Token": document.querySelector('meta[name="csrf_token"]').content
            },
            method: method,
            credentials: "same-origin",
            body: JSON.stringify(this.props.state)
        }).then(res=>{
            if(res.status !== 200){
                throw Error('error');
            }
            return res.json();
        }).then(json=>{
            this.props.addCallback(json);
        }).catch(e => this.props.addErrorCallback(e))
    }
    buttonStyle(i,color){
        return this.props.state.schedule_passwords[i].colors.indexOf(Number(color.id)) < 0 ? {color:color.text_color,background:color.background_color,opacity:'0.2'}:{color:color.text_color,background:color.background_color,opacity:'1'}
    }
    getPasswordForm(){
        const passwordForms = [];
        for(let i = 0;i < this.props.state.schedule_passwords.length;i ++){
            passwordForms.push(
                <div className="form-group"  key={i}>
                    <label htmlFor="schedule_password">パスワード</label><a className="text-danger ml-4" style={{cursor: "pointer"}} onClick={this.props.removeSchedulePassword} data-index={i}>グループを削除</a>
                    <input type="text" className="form-control" value={this.props.state.schedule_passwords[i].schedule_password} data-index={i} id="schedule_password" placeholder="Password" aria-describedby="schedule_passwordHelp" disabled={!this.props.state.password_required} onChange={ev=>this.props.formMethod(['schedule_password',ev])}/>
                    <small id="schedule_passwordHelp" className="form-text text-muted">閲覧に必要なパスワードを入力</small>
                    <div className="d-flex justify-content-around">
                        {this.props.reservationColors.map(color=>
                            <button key={`${i}-${color.id}`} data-id={color.id} data-index={i} type="button" className='btn mt-3' style={this.buttonStyle(i,color)} onClick={this.props.schedulePasswordButtonEvent} >Text</button>
                        )}
                    </div>
                    <small id="schedule_passwordHelp" className="form-text text-muted">パスワードを予約で使用可能な色を紐づけます</small>
                </div>
            );
            if(i === this.props.state.schedule_passwords.length - 1){
                passwordForms.push(
                    this.props.scheduleFormError.schedule_passwords.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.scheduleFormError.schedule_passwords}</strong></span>),
                    <div className="d-flex justify-content-around" key={'add-password'}>
                        <a className="text-primary" style={{cursor: "pointer"}} onClick={this.props.addSchedulePassword}>さらにグループを追加</a>
                    </div>
                );
            }
        }
        return passwordForms;
    }
    render(){
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                予約テーブルを作成 :<Link to='/myschedule'><span className="display-5" onClick={this.props.backClick}>戻る</span></Link>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="name">タイトル</label>
                                    <input type="text" className="form-control" value={this.props.state.name} name="name" id="name" aria-describedby="nameHelp" placeholder="タイトルを入力" onChange={ev=>this.props.formMethod(['name',ev.target.value])}/>
                                    {this.props.scheduleFormError.name.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.scheduleFormError.name}</strong></span>)}
                                    <small id="nameHelp" className="form-text text-muted">50文字以内で予約テーブルのタイトルを入力します</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">説明・備考</label>
                                    <textarea className="form-control" name="description" value={this.props.state.description} id="description" rows="3" aria-describedby="descriptionHelp" onChange={ev=>this.props.formMethod(['description',ev.target.value])}></textarea>
                                    {this.props.scheduleFormError.description.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.scheduleFormError.description}</strong></span>)}
                                    <small id="descriptionHelp" className="form-text text-muted">説明・備考欄に使用されるテキストを入力します</small>
                                </div>
                                <div className="form-group form-check">
                                    <input className="form-check-input" name="password_required" type="checkbox" checked={this.props.state.password_required} id="password_required"　aria-describedby="password_requiredHelp" onChange={ev=>this.props.formMethod(['password_required',ev.target.checked])}/>
                                    {this.props.scheduleFormError.password_required.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.scheduleFormError.password_required}</strong></span>)}
                                    <label className="form-check-label" htmlFor="password_required">閲覧にパスワードを使用する</label>
                                    <small id="password_requiredHelp" className="form-text text-muted">チェックをすると作成された予約テーブルの閲覧にはパスワードが必要になります</small>
                                </div>
                                {this.getPasswordForm()}
                                <div className="form-group form-check">
                                    <input className="form-check-input" name="permit_required" type="checkbox" checked={this.props.state.permit_required} id="permit_required"　aria-describedby="permit_required" onChange={ev=>this.props.formMethod(['permit_required',ev.target.checked])}/>
                                    {this.props.scheduleFormError.permit_required.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.scheduleFormError.permit_required}</strong></span>)}
                                    <label className="form-check-label" htmlFor="permit_required">予約に承認を使用</label>
                                    <small id="permit_requiredHelp" className="form-text text-muted">チェックをすると予約を取る際に承認が必要になります</small>
                                </div>
                                {this.props.editTarget.length > 0 ? 
                                    <button id="sendScheduleButton" className="btn btn-primary center-block mx-auto d-block">更新</button>:
                                    <button id="sendScheduleButton" className="btn btn-primary center-block mx-auto d-block">新規作成</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ScheduleMake);