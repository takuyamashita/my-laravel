import React from 'react';
import {getDateOptions,getHourOptions,getMonthOptions,getMinuteOptions} from '../../DateUtil'

export default class ReservaionForm extends React.Component{

    render(){
        const errorStyle = {
            width:'100%',
            marginTop:'0.25rem',
            fontSize:'80%',
            color:'#e3342f'
        }
        return(
            <div className="my-3">

            <button id="open-form-button" className="btn btn-primary mb-3" type="button" data-toggle="collapse" data-target="#reserveForm" aria-expanded="false" aria-controls="reserveForm">
                予約を作成
            </button>
            <div className="collapse" id="reserveForm">
                <div className="card card-body">
                    <div>
                        <div className="form-group">
                            <label htmlFor="owner_name">予約オーナー</label>
                            <input type="text" className="form-control" value={this.props.reserveForm.owner_name} name="owner_name" id="owner_name" 
                                aria-describedby="owner_Help" placeholder="名前を入力" onChange={(ev)=>this.props.actions.setOwnerName(ev.currentTarget.value)}/>
                            {this.props.reserveFormError.owner_name.length > 0 && (<span style={errorStyle} role="alert"><strong>{this.props.reserveFormError.owner_name}</strong></span>)}
                            <small id="owner_nameHelp" className="form-text text-muted">50文字以内で予約者の名前を入力します</small>
                        </div>
                        <label htmlFor="reserve-form-from">開始日時</label>
                        <div className="form-row" id="reserve-form-from" >
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm"　id="reserve-form-from-year" value={this.props.reserveForm.from.getFullYear()} data-type='from' data-layer='y' onChange={this.setDateForm.bind(this)}>
                                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                    <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-year">年</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-from-month" value={this.props.reserveForm.from.getMonth()} data-type='from' data-layer='m' onChange={this.setDateForm.bind(this)}>
                                    {getMonthOptions(this.props.reserveForm.from.getFullYear())}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-month">月</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-from-date" value={this.props.reserveForm.from.getDate()} data-type='from' data-layer='d' onChange={this.setDateForm.bind(this)}>
                                    {getDateOptions(this.props.reserveForm.from.getFullYear(),this.props.reserveForm.from.getMonth())}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-date">日</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-from-hour" value={this.props.reserveForm.from.getHours()} data-type='from' data-layer='h' onChange={this.setDateForm.bind(this)}>
                                    {getHourOptions()}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-hour">時</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-from-minute" value={this.props.reserveForm.from.getMinutes()} data-type='from' data-layer='mm' onChange={this.setDateForm.bind(this)}>
                                    {getMinuteOptions()}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-from-minute">分</label>
                                </div>
                            </div>
                            {this.props.reserveFormError.from.length > 0 && (<span style={errorStyle} role="alert"><strong>{this.props.reserveFormError.from}</strong></span>)}
                        </div>

                        <label htmlFor="reserve-form-end">終了日時</label>
                        <div className="form-row" id="reserve-form-end">
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-year" value={this.props.reserveForm.end.getFullYear()} data-type='end' data-layer='y' onChange={this.setDateForm.bind(this)}>
                                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                    <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-year">年</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-month" value={this.props.reserveForm.end.getMonth()} data-type='end' data-layer='m' onChange={this.setDateForm.bind(this)}>
                                    {getMonthOptions(this.props.reserveForm.end.getFullYear())}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-month">月</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-date" value={this.props.reserveForm.end.getDate()} data-type='end' data-layer='d' onChange={this.setDateForm.bind(this)}>
                                    {getDateOptions(this.props.reserveForm.end.getFullYear(),this.props.reserveForm.end.getMonth())}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-date">日</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-hour" value={this.props.reserveForm.end.getHours()} data-type='end' data-layer='h' onChange={this.setDateForm.bind(this)}>
                                    {getHourOptions()}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-hour">時</label>
                                </div>
                            </div>
                            <div className="input-group input-group-sm col-md-2 mb-3">
                                <select className="custom-select custom-select-sm" id="reserve-form-end-minute" value={this.props.reserveForm.end.getMinutes()} data-type='end' data-layer='mm' onChange={this.setDateForm.bind(this)}>
                                    {getMinuteOptions()}
                                </select>
                                <div className="input-group-append">
                                    <label className="input-group-text" htmlFor="reserve-form-end-minute">分</label>
                                </div>
                            </div>
                            {this.props.reserveFormError.end.length > 0 && (<span style={errorStyle} role="alert"><strong>{this.props.reserveFormError.end}</strong></span>)}
                            {this.props.reserveFormError.over.length > 0 && (<span style={errorStyle} role="alert"><strong>{this.props.reserveFormError.over}</strong></span>)}
                        </div>
                        
                        
                        <label htmlFor="reserve-form-color">予約カラー</label>
                        <div id="reserve-form-color" >
                            {this.props.colors.map((color,i)=>
                                <div className="form-check form-check-inline mt-2" key={color.id} data-id={color.id} onClick={(ev)=>this.props.actions.setColorForm(Number(ev.currentTarget.dataset.id))}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id={`color-radio-${color.id}`} value="option1"/>
                                    <label className="form-check-label btn" htmlFor={`color-radio-${color.id}`} style={{background:color.background_color,color:color.text_color}} >&nbsp;&nbsp;</label>
                                </div>
                            )}
                        </div>
                        {this.props.reserveFormError.color.length > 0 && (<span style={errorStyle} role="alert"><strong>{this.props.reserveFormError.color}</strong></span>)}
                        {this.props.permitRequired && (
                            <span style={
                                {
                                    width:'100%',
                                    marginTop:'0.25rem',
                                    fontSize:'80%',
                                    color:'#e3342f'
                                }
                            } role="alert" className="text-center mx-auto d-block mt-4">
                                <strong>作成した予約は、オーナーの承認をパスした場合に表示されます</strong>
                            </span>
                        )}
                        <button id="sendScheduleButton" className="btn btn-primary center-block mx-auto d-block mt-1"
                            onClick={()=>{this.props.actions.sendReservation()}}>
                            新規作成
                        </button>
                    </div>
                </div>
            </div>

            </div>
        );
    }

    setDateForm(ev){
        const type = ev.currentTarget.dataset.type;
        const date = new Date(
            this.props.reserveForm[type].getFullYear(),
            this.props.reserveForm[type].getMonth(),
            this.props.reserveForm[type].getDate(),
            this.props.reserveForm[type].getHours(),
            this.props.reserveForm[type].getMinutes()
        );
        switch (ev.currentTarget.dataset.layer){
            case 'y':
                date.setFullYear(Number(ev.target.value));
                break;
            case 'm':
                date.setMonth(Number(ev.target.value));
                break;
            case 'd':
                date.setDate(Number(ev.target.value));
                break;
            case 'h':
                date.setHours(Number(ev.target.value));
                break;
            case 'mm':
                date.setMinutes(Number(ev.target.value));
                break;
        }
        if(type === 'from') this.props.actions.setFromForm(date);
        else this.props.actions.setEndForm(date);
    }


}