import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';
import {parseToDateFromReservation} from '../DateUtil';
import {fetchFromLaravel} from '../FetchUtil';


class ScheduleDetailCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedReservationFrom:'',
            selectedReservationEnd:'',
            selectedReservationId:-1,
            loadings:[],
        }
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
                    {this.props.schedule.not_permit_reservations.length > 0 && (
                        <div className="mt-3 table-responsive overflow-auto" style={{maxHeight:'60vh'}}>
                            <h5 className="text-center">承認待ち予約一覧</h5>
                            <div className="text-right"><span className="badge badge-danger">承認と同時に、重複してる予約は削除されます</span></div>
                            <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">予約オーナー</th>
                                    <th scope="col">開始日時</th>
                                    <th scope="col">終了日時</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.schedule.not_permit_reservations.map((reservation,i)=>
                                    <tr key={i} className={
                                        this.state.selectedReservationFrom.length > 0 &&
                                        parseToDateFromReservation(reservation.from.split(/-|\s|:/)).getTime() < parseToDateFromReservation(this.state.selectedReservationEnd.split(/-|\s|:/)).getTime() &&  
                                        parseToDateFromReservation(reservation.end.split(/-|\s|:/)).getTime() > parseToDateFromReservation(this.state.selectedReservationFrom.split(/-|\s|:/)).getTime() ?
                                        'table-success':''
                                    }
                                        data-from={reservation.from} data-end={reservation.end} onClick={this.selectReservation.bind(this)} data-id={reservation.id}
                                    >
                                        <td scope="row">{reservation.owner_name}</td>
                                        <td>{reservation.from}</td>
                                        <td>{reservation.end}</td>
                                        <td>
                                            {!this.state.loadings.includes(Number(reservation.id)) && (
                                                <button type="button" className="btn btn-success btn-sm" onClick={this.permitReservation.bind(this)}>承認</button>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    selectReservation(ev){
        this.setState({
            selectedReservationFrom:ev.currentTarget.dataset.from,
            selectedReservationEnd:ev.currentTarget.dataset.end,
            selectedReservationId:Number(ev.currentTarget.dataset.id),
        });
    }

    permitReservation(ev){
        const dataset = ev.currentTarget.parentElement.parentElement.dataset;
        const loadingsArray = [];
        this.props.schedule.not_permit_reservations.forEach(reservation=>{
            if(
                parseToDateFromReservation(reservation.from.split(/-|\s|:/)).getTime() < parseToDateFromReservation(dataset.end.split(/-|\s|:/)).getTime() &&  
                parseToDateFromReservation(reservation.end.split(/-|\s|:/)).getTime() > parseToDateFromReservation(dataset.from.split(/-|\s|:/)).getTime()
            ){
                loadingsArray.push(Number(reservation.id));
            }
        })
        this.setState({loadings:[...this.state.loadings,...loadingsArray]});
        fetchFromLaravel(
            document.querySelector('meta[name="csrf_token"]').content,
            'PUT',
            `/reservations/${ev.currentTarget.parentElement.parentElement.dataset.id}`,
            {
                hash_digest:this.props.schedule.hash_digest
            },
            res => {
                this.props.permitCallBack(res);
            }
        )
    }
}

export default withRouter(ScheduleDetailCard);