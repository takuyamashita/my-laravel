import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';
import { findDOMNode } from 'react-dom/cjs/react-dom.development';

import {formatDate} from '../DateUtil';

class ReserveForm extends React.Component{
    constructor(props){
        super(props);
        this.currentDate = new Date();
        this.currentDate.setMinutes(0);
        this.state = {
            from : this.currentDate,
            end : new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate(),this.currentDate.getHours() + 1)
        }
        this.errorStyle = {
            width:'100%',
            marginTop:'0.25rem',
            fontSize:'80%',
            color:'#e3342f'
        }
    }
    render(){
        return (
            <div className="my-3">

            <button className="btn btn-primary mb-3" type="button" data-toggle="collapse" data-target="#reserveForm" aria-expanded="false" aria-controls="reserveForm">
                予約を作成
            </button>
            <div className="collapse" id="reserveForm">
                <div className="card card-body">
                    <div>
                        <div className="form-group">
                            <label htmlFor="owner_name">予約オーナー</label>
                            <input type="text" className="form-control" value={this.props.reserveForm.owner_name} name="owner_name" id="owner_name" aria-describedby="owner_Help" placeholder="名前を入力" onChange={ev=>this.props.formMethod('owner_name',ev.target.value)}/>
                            {this.props.reserveFormError.owner_name.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.reserveFormError.owner_name}</strong></span>)}
                            <small id="owner_nameHelp" className="form-text text-muted">50文字以内で予約者の名前を入力します</small>
                        </div>
                        <label htmlFor="reserve-form-from">開始日時</label>
                        <div className="form-row" id="reserve-form-from" >
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm"　id="reserve-form-from-year" value={this.state.from.getFullYear()} onChange={this.setFromForm.bind(this)}>
                                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                    <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-year">年</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-from-month" value={this.state.from.getMonth()} onChange={this.setFromForm.bind(this)}>
                                    {this.getMonthOptions(this.state.from.getFullYear())}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-month">月</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-from-date" value={this.state.from.getDate()} onChange={this.setFromForm.bind(this)}>
                                    {this.getDateOptions(this.state.from.getFullYear(),this.state.from.getMonth())}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-date">日</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-from-hour" value={this.state.from.getHours()} onChange={this.setFromForm.bind(this)}>
                                    {this.getHourOptions()}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-hour">時</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-from-minute" value={this.state.from.getMinutes()} onChange={this.setFromForm.bind(this)}>
                                    {this.getMinuteOptions()}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-minute">分</label>
                                </div>
                            </div>
                            {this.props.reserveFormError.from.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.reserveFormError.from}</strong></span>)}
                        </div>

                        <label htmlFor="reserve-form-end">終了日時</label>
                        <div className="form-row" id="reserve-form-end">
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-year" value={this.state.end.getFullYear()} onChange={this.setEndForm.bind(this)}>
                                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                    <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-year">年</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-month" value={this.state.end.getMonth()} onChange={this.setEndForm.bind(this)}>
                                    {this.getMonthOptions(this.state.end.getFullYear())}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-month">月</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-date" value={this.state.end.getDate()} onChange={this.setEndForm.bind(this)}>
                                    {this.getDateOptions(this.state.end.getFullYear(),this.state.end.getMonth())}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-date">日</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-hour" value={this.state.end.getHours()} onChange={this.setEndForm.bind(this)}>
                                    {this.getHourOptions()}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-hour">時</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-minute" value={this.state.end.getMinutes()} onChange={this.setEndForm.bind(this)}>
                                    {this.getMinuteOptions()}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-minute">分</label>
                                </div>
                            </div>
                            {this.props.reserveFormError.end.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.reserveFormError.end}</strong></span>)}
                            {this.props.reserveFormError.over.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.reserveFormError.over}</strong></span>)}
                        </div>
                        
                        
                        <label htmlFor="reserve-form-color">予約カラー</label>
                        <div id="reserve-form-color" >
                            {this.props.colors.map((color,i)=>
                                <div className="form-check form-check-inline mt-2" key={color.id} data-id={color.id} onClick={ev=>this.props.formMethod('color',ev.currentTarget.dataset.id)}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id={`color-radio-${color.id}`} value="option1"/>
                                    <label className="form-check-label btn" htmlFor={`color-radio-${color.id}`} style={{background:color.background_color,color:color.text_color}} >&nbsp;&nbsp;</label>
                                </div>
                            )}
                        </div>
                        {this.props.reserveFormError.color.length > 0 && (<span style={this.errorStyle} role="alert"><strong>{this.props.reserveFormError.color}</strong></span>)}
                        <button id="sendScheduleButton" className="btn btn-primary center-block mx-auto d-block mt-4" onClick={this.createButtonClick.bind(this)}>新規作成</button>
                    </div>
                </div>
            </div>

            </div>
        );
    }
    getMonthOptions(year){
        const options = [];
        let month = year > new Date().getFullYear() ? 0 : new Date().getMonth();
        while(month < 12){
            options.push(
                <option value={month}>{month + 1}</option>
            );
            month ++;
        }
        return options;
    }
    getDateOptions(year,month){
        const options = [];
        const dates = new Date(year,month + 1, 0).getDate();
        for(let i = 1;i <= dates;i ++){
            options.push(
                <option value={i}>{i}</option>
            );
        }
        return options;
    }
    getHourOptions(){
        const options = [];
        for(let i = 0;i < 24;i ++) options.push(<option value={i}>{i}</option>);
        return options;
    }
    getMinuteOptions(){
        const options = [];
        for(let i = 0;i < 60;i += 5) options.push(<option value={i}>{i}</option>);
        return options;
    }
    getColorDropDownButtonStyle(){
        const color = this.props.colors.find(color=>color.id === this.props.reserveForm.color);
        console.log(color);
        if((color)) return {background:color.background_color,color:color.text_color};
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
    validate(){
        let validated = true;
        
        this.props.errorMethod('owner_name','');
        this.props.errorMethod('from','');
        this.props.errorMethod('end','');
        this.props.errorMethod('over','');
        this.props.errorMethod('color','');

        if(this.props.reserveForm.owner_name.length < 1){
            this.props.errorMethod('owner_name','1文字以上を入力');
            validated = false;
        }
        if(this.state.from.getTime() < new Date().getTime()){
            this.props.errorMethod('from','予約は現在より先に設定してください');
            validated = false;
        }
        if(this.state.end.getTime() < this.state.from.getTime()){
            this.props.errorMethod('end','予約は開始日時より先に設定してください');
            validated = false;
        }
        const notOver = this.props.reservations.filter(reservation=>{
            const formFrom = formatDate(this.state.from,'YYYY-MM-DD HH:mm:00');
            const formEnd = formatDate(this.state.end,'YYYY-MM-DD HH:mm:00');
            
            if(reservation.from < formEnd && formFrom < reservation.end){
                return true;
            }

            return false;
        });
        if(notOver.length !== 0){
            this.props.errorMethod('over','重複しています');
            validated = false;
        }
        if(!(document.querySelector('#reserve-form-color input:checked'))){
            this.props.errorMethod('color','色を選択して下さい');
            validated = false;
        }
        return validated;
    }
    createButtonClick(){
        if(!this.validate()) return;
        this.props.formMethod('from',this.state.from);
        this.props.formMethod('end',this.state.end);
        this.props.createReservation(
            this.props.reserveForm.owner_name,
            this.state.from,
            this.state.end,
            this.props.reserveForm.color
        );
    }
}

export default withRouter(ReserveForm);