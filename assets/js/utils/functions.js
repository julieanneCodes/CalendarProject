import { months, completeDays, days } from './constants';

export const dateFormatter = (date_) => {
  if (typeof date_ == "undefined" ) {
    return "";
  } else {
  const date = new Date(date_);

  const monthDay = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const month = date.getMonth();
  const weekDayName = completeDays[date.getDay()];
  const weekDayShort = days[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  return {
    default: monthName + ' ' + monthDay + ', ' + year,
    weekDay: weekDayName + ' ' + monthDay,
    databased: new Date(year, month, monthDay).getTime(),
    display: weekDayName + ', ' + monthDay + ' of ' + monthName + ' ' + year,
    monthName: monthName,
    monthYear: monthName + ' ' + year,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ' h',
    hourInput: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
    input: `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }`,
  };
}
};