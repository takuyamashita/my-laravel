import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';

import ScheduleDetailCard from './ScheduleDetailCard';


class ScheduleList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let td = this.props.schedules.map(schedule=>
            <tr key={schedule.name} style={this.props.creatings.includes(schedule.name) ? {opacity:0.4,pointerEvents:'none'}:{opacity:1}} data-name={schedule.name} onClick={this.props.targetSelect}>
            <td ><input type="checkbox" checked={schedule.name === this.props.targetName} className="position-static" readOnly/></td>
            <td >{schedule.name}</td>
            <td >{schedule.description}</td>
            <td ><div className="text-center">{schedule.password_required ? <span className="badge badge-success">有効</span>:<span className="badge badge-secondary">無効</span>}</div></td>
            <td ><div className="text-center">{schedule.permit_required ? <span className="badge badge-success">有効</span>:<span className="badge badge-secondary">無効</span>}</div></td>
            </tr>
        );
        let mainWidth = {minWidth:'80vw'};
        return (
            <div className="container mt-5" style={mainWidth}>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">マイ予約テーブル一覧</div>

                            <div className="card-body">
                                <Link to='/myschedule/make'>
                                    <span className="display-5">新しく予約テーブルを作成</span>
                                </Link>
                                {this.props.targetName.length > 0 && 
                                    <ScheduleDetailCard schedule={this.props.schedules.filter(schedule=>schedule.name === this.props.targetName)[0]} permitCallBack={this.props.permitCallBack} editClick={this.props.editClick}></ScheduleDetailCard>
                                }
                                <div className="table-responsive">
                                    <table className="table mt-5 table-hover">
                                        <thead className="thead-light">
                                            <tr>
                                            <th scope="col"></th>
                                            <th scope="col">タイトル</th>
                                            <th scope="col" className="text-nowrap">説明・備考</th>
                                            <th scope="col"><div className="text-center">パス認証</div></th>
                                            <th scope="col"><div className="text-center">承認</div></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {td}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ScheduleList);


