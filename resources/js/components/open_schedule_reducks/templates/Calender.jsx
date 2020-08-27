import React from 'react';
import {parseToDateFromReservation} from '../../DateUtil';

export default class Calender extends React.Component{
    constructor(props){
        super(props);
        this.dayWidth = 5;
        this.hourHeight = 2;
        this.headHeight = 2;
        this.lineInterval = this.hourHeight / 2;
        this.timeRectLong = this.lineInterval;
        this.dayColor = ['#eac5d2','#f5f5f5','#f5f5f5','#f5f5f5','#f5f5f5','#f5f5f5','#cac5ea'];
        this.state = {
            detailDisplay : false,
            detailData : null
        }
        window.addEventListener('resize',this.props.actions.setVibibleDayCount);
        window.addEventListener('click',ev=>{
            if(this.state.detailDisplay && ev.target.className.baseVal !== 'reservation-hover')this.setState({detailDisplay:false});
        });
    }

    render(){
        return(
            <div style={{width:'100%',position:'relative'}}>
                {this.getReservationDetail()}
                <svg viewBox={`0 0 ${this.props.visibleDayCount*this.dayWidth} ${24*this.hourHeight + this.headHeight}`} width="100%">
                    {this.getBackGrounds()}
                    {this.getHeader()}
                    {this.getReservations()}
                </svg>
            </div>
        );
    }

    getHeader(){
        const date = new Date(this.props.selectDate.getFullYear(),this.props.selectDate.getMonth(),this.props.selectDate.getDate());
        const lastDayOfMonth = new Date(this.props.selectDate.getFullYear(),this.props.selectDate.getMonth() + 1,0).getDate();
        const startDay = date.getDate();
        const daysHead = [];
        const dayscontent = [];
        const headText = [];
        for(let i = 0;i < this.props.visibleDayCount;i ++){
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
        return [daysHead,dayscontent,headText];
    }

    getBackGrounds(){
        const backHorizenLines = [];
        const backVerticalLines = [];
        const timeRects = [];
        const timeTexts = [];
        let verticalCounter = 1;
        for(let i = 0;i <= 24*this.hourHeight + this.headHeight;i += this.lineInterval){
            backHorizenLines.push(
                <line key={i} x1={0} y1={i} x2={this.props.visibleDayCount*this.dayWidth} y2={i} stroke="#878787" strokeWidth="0.03"/>
            );
            if(i >= this.headHeight + this.hourHeight && i % this.hourHeight === 0){
                if(verticalCounter % 2 === 0 && verticalCounter < 24){
                    for(let k = 2;k < this.props.visibleDayCount;k += 3){
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
        for(let i = 0;i <= this.props.visibleDayCount*this.dayWidth;i += this.lineInterval){
            backVerticalLines.push(
                <line key={i} x1={i} y1={this.lineInterval} x2={i} y2={this.lineInterval*2 + 24*this.hourHeight} stroke="#878787" strokeWidth={i % this.dayWidth == 0 ? '0.07':'0.03'}/>
            );
        }
        return [backHorizenLines,backVerticalLines,timeRects,timeTexts];
    }

    getReservations(){
        const reservations = [];
        const lenth = this.props.reservations.length;
        const fromDate = new Date(this.props.selectDate.getFullYear(),this.props.selectDate.getMonth(),this.props.selectDate.getDate());
        const endDate = new Date(this.props.selectDate.getFullYear(),this.props.selectDate.getMonth(),this.props.selectDate.getDate());
        const endTime = fromDate.getTime() + 86400000 * this.props.visibleDayCount;
        endDate.setDate(fromDate.getDate() + this.props.visibleDayCount);
        for(let i = 0;i < lenth;i ++){
            const reservation = this.props.reservations[i];
            const reservationFrom = parseToDateFromReservation(reservation.from.split(/-|\s|:/));
            const reservationEnd = parseToDateFromReservation(reservation.end.split(/-|\s|:/));
            if(reservationEnd.getTime() > fromDate.getTime() && reservationFrom.getTime() < endTime){
                const x = (n) => ( Math.floor((reservationFrom.getTime() - this.props.selectDate.getTime()) / 86400000 ) + n) * this.dayWidth + 0.6;
                const y = this.headHeight + (reservationFrom.getHours() / 24 + reservationFrom.getMinutes() / (60 * 24)) * (this.hourHeight * 24);
                const height = (reservationEnd.getHours() - reservationFrom.getHours() + reservationEnd.getMinutes() / 60) * this.hourHeight;
                const dateCount = reservationEnd.getDate() - reservationFrom.getDate();
                const reservationElemts = [];
                for(let k = 0;k <= dateCount;k ++){
                    if(k === 0){
                        reservationElemts.push(
                            <rect key={`${i}-${k}`} x={x(k)} y={y} width={this.dayWidth - 1.2} className='reservation-hover' onClick={this.reservationClick.bind(this)}
                                height={dateCount === 0 ? height:this.hourHeight * 24 + this.headHeight - y} rx="1" ry="1" strokeWidth="0" fill={reservation.color.background_color}
                            />
                        );
                    }else if(k === dateCount){
                        reservationElemts.push(
                            <rect key={`${i}-${k}`} x={x(k)} y={this.headHeight} width={this.dayWidth - 1.2} className='reservation-hover' onClick={this.reservationClick.bind(this)}
                                height={reservationEnd.getHours() * this.hourHeight} rx="1" ry="1" strokeWidth="0" fill={reservation.color.background_color}
                            />
                        );
                    }else{
                        reservationElemts.push(
                            <rect key={`${i}-${k}`} x={x(k)} y={this.headHeight} width={this.dayWidth - 1.2} className='reservation-hover' onClick={this.reservationClick.bind(this)}
                                height={this.hourHeight * 24} rx="1" ry="1" strokeWidth="0" fill={reservation.color.background_color}
                            />
                        );
                    }
                }
                reservations.push(
                    <g key={i} style={'dummyId' in reservation ? {opacity:0.3}:{opacity:0.8}}
                        data-owner-name={reservation.owner_name} data-from={reservation.from} data-end={reservation.end}
                        data-background-color={reservation.color.background_color} data-text-color={reservation.color.text_color}
                    >
                        {reservationElemts}
                    </g>
                );
            }
        }
        return reservations;
    }

    getReservationDetail(){
        return (
            this.state.detailDisplay && (
                <div className="card reservation-detail-card" style={{
                            background:this.state.detailData.backgroundColor,
                            color:this.state.detailData.textColor
                        }}>
                    <div className="card-body">
                        <h5 className="card-title">予約オーナー:{this.state.detailData.ownerName}</h5>
                        <h5 className="card-title">開始:{new String(this.state.detailData.from).slice(0,-3)}</h5>
                        <h5 className="card-title">終了:{new String(this.state.detailData.end).slice(0,-3)}</h5>
                        {this.props.owner && (
                            <button className="btn center-block mx-auto d-block mt-1 reservation-delete-button"
                                onClick={()=>this.props.actions.deleteReservation(this.state.detailData.from,this.state.detailData.end)}>削除</button>
                        )}
                    </div>
                </div>
            )
        )
        
    }

    reservationClick(ev){
        this.setState({
            detailDisplay:true,
            detailData:{...ev.currentTarget.parentElement.dataset}
        })
    }

}