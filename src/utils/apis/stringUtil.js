import {format, parse} from 'date-fns';
import moment from 'moment';

function convertToMoney(number, roundUp = false) {
  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
  };
  const numberFormat = roundUp ? number.toFixed(0) : number;
  return `${new Intl.NumberFormat('vi-VN', config)
    .format(numberFormat)
    .replace(/₫/g, '')
    .trim()}`;
}

function getDDMMYY(dateTimeString) {
  const parsedDate = parse(dateTimeString, 'yyyy-MM-dd HH:mm:ss', new Date());
  if (parsedDate instanceof Date && !isNaN(parsedDate)) {
    const dateTimeFormat = 'dd-MM-yyyy';
    const formattedDate = format(parsedDate, dateTimeFormat);

    return formattedDate;
  } else {
    return 'Invalid Date';
  }
}

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function getHHMMSS(dateTimeString) {
  const parsedDate = parse(dateTimeString, 'yyyy-MM-dd HH:mm:ss', new Date());
  if (parsedDate instanceof Date && !isNaN(parsedDate)) {
    const dateTimeFormat = 'HH:mm:ss';
    const formattedDate = format(parsedDate, dateTimeFormat);

    return formattedDate;
  } else {
    return 'Invalid Date';
  }
}

export const handleTimeToMinutes = (time, type) => {
  const timeString = moment(time).format("DD/MM/YYYY HH:mm:ss").toString();
  const nowString = moment(Date().now).format("DD/MM/YYYY HH:mm:ss").toString();
  const dateTime = moment(timeString, "DD/MM/YYYY HH:mm:ss");
  const dateNow = moment(nowString, "DD/MM/YYYY HH:mm:ss");
  const diff = moment(dateNow).diff(moment(dateTime));
  const diffInMinutes = moment.duration(diff).asMinutes();
  const diffInHours = moment.duration(diff).asHours();
  const diffInDays = moment.duration(diff).asDays();
  const diffInYears = moment.duration(diff).asYears();
  if (type === "hour") return Math.ceil(diffInHours) || 1;
  if (type === "day") return Math.ceil(diffInDays) || 1;
  if (type === "year") return Math.ceil(diffInYears);
  return Math.ceil(diffInMinutes);
};

export const handleShowTime = (time) => {
  if (handleTimeToMinutes(time) < 1) return "Vừa xong";

  if (handleTimeToMinutes(time) < 59) {
    return `${handleTimeToMinutes(time)} phút`;
  }

  if (handleTimeToMinutes(time, "hour") < 24) {
    return `${handleTimeToMinutes(time, "hour")} giờ`;
  }

  if (handleTimeToMinutes(time, "day") < 7) {
    return `${handleTimeToMinutes(time, "day")} ngày`;
  }

  return `${moment(time).format("DD/MM")}`;
};

export {convertToMoney, getDDMMYY, getHHMMSS,validateEmail};
