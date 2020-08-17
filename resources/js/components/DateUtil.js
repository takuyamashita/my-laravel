
export function formatDate(date,formatString){
    const addZero = (num)=> String(num).length === 1 ? `0${num}`:num;
    formatString = formatString.replace(/YYYY/,date.getFullYear());
    formatString = formatString.replace(/MM/,addZero(date.getMonth() + 1));
    formatString = formatString.replace(/DD/,addZero(date.getDate()));
    formatString = formatString.replace(/HH/,addZero(date.getHours()));
    formatString = formatString.replace(/mm/,addZero(date.getMinutes()));
    return formatString;
}