import { months } from './constants';

export const dateFormatter = (date_) => {
  const date = new Date(date_);

  const monthDay = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  //const weekDayName = days[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    default: monthName + ' ' + monthDay + ', ' + year,
    short: monthName.slice(0, 3) + ' ' + monthDay,
    //day: weekDayName,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
    input: `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }`,
  };
};