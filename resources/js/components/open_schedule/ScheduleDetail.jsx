import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

import CarenderSelectHeader from './CalenderSelectHeader';
import ReserveForm from './ReserveForm';


class ScheduleDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visibleDayNum : this.getVisibleDayNum(),
            year : new Date().getFullYear(),
            month : new Date().getMonth(),
            date : new Date().getDate(),
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
            }
        }
        this.dayWidth = 5;
        this.hourHeight = 2;
        this.headHeight = 2;
        this.lineInterval = this.hourHeight / 2;
        this.timeRectLong = this.lineInterval;
        this.dayColor = ['#eac5d2','#f5f5f5','#f5f5f5','#f5f5f5','#f5f5f5','#f5f5f5','#cac5ea'];
        
        this.backHorizenLines = [];
        this.backVerticalLines = [];
        this.timeRects = [];
        this.timeTexts = [];
        this.reservations = [];
        window.addEventListener('resize',()=>{
            this.setState({visibleDayNum:this.getVisibleDayNum()})
        });
    }

    setBackGrounds(){
        const backHorizenLines = [];
        const backVerticalLines = [];
        const timeRects = [];
        const timeTexts = [];
        let verticalCounter = 1;
        for(let i = 0;i <= 24*this.hourHeight + this.headHeight;i += this.lineInterval){
            backHorizenLines.push(
                <line key={i} x1={0} y1={i} x2={this.state.visibleDayNum*this.dayWidth} y2={i} stroke="#878787" strokeWidth="0.03"/>
            );
            if(i >= this.headHeight + this.hourHeight && i % this.hourHeight === 0){
                if(verticalCounter % 2 === 0 && verticalCounter < 24){
                    for(let k = 2;k < this.state.visibleDayNum;k += 3){
                        timeRects.push(
                            <rect key={`${i}-${k}`} x={k * this.dayWidth - this.timeRectLong/2} y={i - this.timeRectLong/2} width={this.timeRectLong} height={this.timeRectLong} stroke="none" strokeWidth="0.05" fill="#615f6f"/>
                        );
                        timeTexts.push(
                            <text key={`${i}-${k}`} x={k * this.dayWidth} y={i} fontSize="0.7" fill="#ffffff" textAnchor="middle" dominantBaseline="central">
                                {verticalCounter}
                            </text>
                        );
                    }
                }
                verticalCounter ++ ;
            }
        }
        for(let i = 0;i <= this.state.visibleDayNum*this.dayWidth;i += this.lineInterval){
            backVerticalLines.push(
                <line key={i} x1={i} y1={this.lineInterval} x2={i} y2={this.lineInterval*2 + 24*this.hourHeight} stroke="#878787" strokeWidth={i % this.dayWidth == 0 ? '0.07':'0.03'}/>
            );
        }
        this.backHorizenLines = backHorizenLines;
        this.backVerticalLines = backVerticalLines;
        this.timeRects = timeRects;
        this.timeTexts = timeTexts;
    }

    setReservations(){
        this.reservations = [];
        const lenth = this.props.reservations.length;
        const fromDate = new Date(this.state.year,this.state.month,this.state.date);
        const endDate = new Date(this.state.year,this.state.month,this.state.date);
        endDate.setDate(fromDate.getDate() + this.state.visibleDayNum);
        for(let i = 0;i < lenth;i ++){
            const reservation = this.props.reservations[i];
            const reservationFrom = this.parseToDateFromReservation(reservation.from.split(/-|\s|:/));
            const reservationEnd = this.parseToDateFromReservation(reservation.end.split(/-|\s|:/));
            if(reservationEnd.getTime() > fromDate.getTime() && reservationFrom.getTime() < endDate.getTime()){
                const x = (i) => (reservationFrom.getDate() - this.state.date + i) * this.dayWidth + 0.6;
                const y = this.headHeight + (reservationFrom.getHours() / 24 + reservationFrom.getMinutes() / (60 * 24)) * (this.hourHeight * 24);
                const height = (reservationEnd.getHours() - reservationFrom.getHours()) * this.hourHeight;
                const dateCount = reservationEnd.getDate() - reservationFrom.getDate();
                const reservationElemts = [];
                for(let k = 0;k <= dateCount;k ++){
                    if(k === 0){
                        reservationElemts.push(
                            <rect key={`${i}-${k}`} x={x(k)} y={y} width={this.dayWidth - 1.2}
                                height={dateCount === 0 ? height:this.hourHeight * 24 + this.headHeight - y} rx="1" ry="1" strokeWidth="0" fill={reservation.color.background_color}
                            />
                        );
                    }else if(k === dateCount){
                        reservationElemts.push(
                            <rect key={`${i}-${k}`} x={x(k)} y={this.headHeight} width={this.dayWidth - 1.2}
                                height={reservationEnd.getHours() * this.hourHeight} rx="1" ry="1" strokeWidth="0" fill={reservation.color.background_color}
                            />
                        );
                    }else{
                        reservationElemts.push(
                            <rect key={`${i}-${k}`} x={x(k)} y={this.headHeight} width={this.dayWidth - 1.2}
                                height={this.hourHeight * 24} rx="1" ry="1" strokeWidth="0" fill={reservation.color.background_color}
                            />
                        );
                    }
                }
                this.reservations.push(
                    <g key={i} style={'dummyId' in reservation ? {opacity:0.3}:{opacity:0.8}}>
                        {reservationElemts}
                    </g>
                );
            }
        }
    }

    parseToDateFromReservation(array){
        const dateArray = array;
        //2020-08-05 07:25:00
        
        const reservationDate = new Date(
            Number(dateArray[0]),
            dateArray[1][0] === '0' ? Number(dateArray[1][1]) - 1 : Number(dateArray[1]) -1,
            dateArray[2][0] === '0' ? Number(dateArray[2][1]) : Number(dateArray[2]),
            dateArray[3][0] === '0' ? Number(dateArray[3][1]) : Number(dateArray[3]),
            dateArray[4][0] === '0' ? Number(dateArray[4][1]) : Number(dateArray[4]),
        );

        return reservationDate;
    }

    calender(){
        this.setBackGrounds();
        this.setReservations();
        const date = new Date(this.state.year,this.state.month,this.state.date);
        const lastDayOfMonth = new Date(this.state.year,this.state.month + 1,0).getDate();
        const startDay = date.getDate();
        const daysHead = [];
        const dayscontent = [];
        const headText = [];
        for(let i = 0;i < this.state.visibleDayNum;i ++){
            daysHead.push(
                <rect key={i} x={i*this.dayWidth} y="0" width={this.dayWidth} height={this.headHeight} stroke="none" strokeWidth="1" fill={this.dayColor[date.getDay() + i < 7 ? date.getDay() + i : (date.getDay() + i) % 7]}/>
            );
            headText.push(
                <text key={i} x={i*this.dayWidth + 1.5} y={this.headHeight/2} fontSize="0.8" fill="#797979" textAnchor="middle" dominantBaseline="central">
                    {startDay + i <= lastDayOfMonth ? startDay + i : startDay + i - lastDayOfMonth}
                </text>
            );
            dayscontent.push(
                <path key={i} d={`M${i*this.dayWidth},${this.headHeight} h${this.dayWidth} v${24*this.hourHeight} h${-this.dayWidth}z`} stroke="#767474" strokeWidth="0" fill="#fbfbfb66"/>
            );
        }
        return (
            <div style={{width:'100%'}}>
                <svg viewBox={`0 0 ${this.state.visibleDayNum*this.dayWidth} ${24*this.hourHeight + this.headHeight}`} width="100%">
                    {this.backHorizenLines}
                    {this.backVerticalLines}
                    {this.timeRects}
                    {this.timeTexts}
                    {daysHead}
                    {headText}
                    {dayscontent}
                    {this.reservations}
                </svg>
            </div>
        );
    }

    selectDate(ev){
        if((ev.target.dataset.key)){
            switch (ev.target.dataset.key){
                case ('date'):
                    this.setState({date:Number(ev.target.dataset.value)});
                    break;
                case ('month'):
                    this.setState({month:Number(ev.target.dataset.value)});
                    break;
                case ('year'):
                    this.setState({year:Number(ev.target.dataset.value)});
                    break;
                case ('next'):
                    this.setDate(7);
                    break;
                case ('back'):
                    this.setDate(-7);
                    break;
            }
        }
    }

    setDate(add){
        const date = new Date(this.state.year,this.state.month,this.state.date);
        date.setDate(date.getDate() + add);
        this.setState({
            year : date.getFullYear(),
            month : date.getMonth(),
            date : date.getDate()
        });
    }

    getVisibleDayNum(){
        if(window.innerWidth > 1200){
            return 13;
        }else if(960 < window.innerWidth && window.innerWidth <= 1200){
            return 11;
        }if(720 < window.innerWidth && window.innerWidth <= 960){
            return 9;
        }if(window.innerWidth <= 720){
            return 7;
        }
        return 7;
    }

    render(){
        return (
            <div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">{this.props.schedule_name}</div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {this.props.schedule_description !== null && this.props.schedule_description.split('\n').map((line,i)=><p key={i}>{line}</p>)}
                                    </h5>
                                    <ReserveForm
                                        reservations={this.props.reservations}
                                        reserveForm={this.props.reserveForm}
                                        reserveFormError={this.props.reserveFormError} 
                                        createReservation={this.props.createReservation} 
                                        formMethod={this.props.formMethod} 
                                        errorMethod={this.props.errorMethod}
                                        setFromForm={this.props.setFromForm}
                                        setEndForm={this.props.setEndForm}
                                        colors={this.props.colors} 
                                        from={this.props.from}
                                        end={this.props.end}
                                    />
                                    <CarenderSelectHeader year={this.state.year} month={this.state.month} date={this.state.date} selectDate={this.selectDate.bind(this)}/>
                                    {this.calender()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(ScheduleDetail);