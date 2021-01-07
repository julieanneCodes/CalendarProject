import { months, completeDays } from './constants';

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
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    default: monthName + ' ' + monthDay + ', ' + year,
    databased: new Date(year, month, monthDay).getTime(),
    display: weekDayName + ', ' + monthDay + ' of ' + monthName + ' ' + year,
    monthName: monthName,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ' h -',
    input: `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }`,
  };
}
};