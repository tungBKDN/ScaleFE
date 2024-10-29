export function ResultFormat(value) {
    return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function TimeFormat(value) {
    // format: mdd/mm hh:mm:ss
    let _date = new Date(value);
    let _day = _date.getDate();
    let _month = _date.getMonth() + 1;
    let _hours = _date.getHours();
    let _minutes = _date.getMinutes();
    let _seconds = _date.getSeconds();
    return `${_day}/${_month} ${_hours}:${_minutes}:${_seconds}`;
}