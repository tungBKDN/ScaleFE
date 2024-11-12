export function ResultFormat(value, digit = 2) {
    value = parseFloat(value);
    return value.toFixed(digit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function TimeFormat(value) {
    // format: mdd/mm hh:mm:ss
    let _date = new Date(value);
    let _day = _date.getDate();
    let _month = _date.getMonth() + 1;
    let _hours = _date.getHours();
    let _minutes = _date.getMinutes();
    let _seconds = _date.getSeconds();
    // add 0 if value < 10
    if (_day < 10) _day = "0" + _day;
    if (_month < 10) _month = "0" + _month;
    if (_hours < 10) _hours = "0" + _hours;
    if (_minutes < 10) _minutes = "0" + _minutes;
    if (_seconds < 10) _seconds = "0" + _seconds;
    return _day + "/" + _month + " " + _hours + ":" + _minutes + ":" + _seconds;
}

export function PriceFormat(value, unit) {
    value = Math.round(parseFloat(value));
    // format: d.ddd.ddd VND
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " " + unit;
}

export function TextCapitalize(text) {
    return text.toString().charAt(0).toUpperCase() + text.toString().slice(1).toLowerCase();
}