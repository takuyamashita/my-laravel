import React from 'react';


export function formatDate(date,formatString){
    const addZero = (num)=> String(num).length === 1 ? `0${num}`:num;
    formatString = formatString.replace(/YYYY/,date.getFullYear());
    formatString = formatString.replace(/MM/,addZero(date.getMonth() + 1));
    formatString = formatString.replace(/DD/,addZero(date.getDate()));
    formatString = formatString.replace(/HH/,addZero(date.getHours()));
    formatString = formatString.replace(/mm/,addZero(date.getMinutes()));
    return formatString;
}

export function parseToDateFromReservation(array){
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

export function getMonthOptions(year){
    const options = [];
    let month = year > new Date().getFullYear() ? 0 : new Date().getMonth();
    while(month < 12){
        options.push(
            <option key={month} value={month}>{month + 1}</option>
        );
        month ++;
    }
    return options;
}

export function getDateOptions(year,month){
    const options = [];
    const dates = new Date(year,month + 1, 0).getDate();
    for(let i = 1;i <= dates;i ++){
        options.push(
            <option key={i} value={i}>{i}</option>
        );
    }
    return options;
}

export function getHourOptions(){
    const options = [];
    for(let i = 0;i < 24;i ++) options.push(<option key={i} value={i}>{i}</option>);
    return options;
}
export function  getMinuteOptions(){
    const options = [];
    for(let i = 0;i < 60;i += 5) options.push(<option key={i} value={i}>{i}</option>);
    return options;
}