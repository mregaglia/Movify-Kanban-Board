import moment from 'moment';

export const DIFF_DAY = 24 * 60 * 60 * 1000;
export const DIFF_5_DAYS = 5 * DIFF_DAY;
export const DIFF_10_DAYS = 10 * DIFF_DAY;

export const isOverDiff = (timestamp, diff) => {
  const now = new Date().getTime();
  return now - timestamp > diff;
};

export const getLast4weeksDate = () => {

  let tableWeek = [1, 2, 3, 4]

  let dates = tableWeek.map(getWeekDateAndTimestamp)
  
  return dates;
}

const getWeekDateAndTimestamp = (week) => {
  let startWeek =   moment().subtract(week, 'weeks').startOf('isoWeek');
  let endWeek = moment().subtract(week, 'weeks').endOf('isoWeek')

  return {
    start: parseInt(startWeek.format('YYYYMMDD')),
    end: parseInt(endWeek.format('YYYYMMDD')),
    startTimestamp: startWeek.valueOf(),
    endTimestamp : endWeek.valueOf()
  }
}

export const getDateLabel = (date) => {

  let day = date.toString().substring(6, 8).replace('0', '')
  let month = date.toString().substring(4,6);
  
  switch (month) {
    case "01":
      return day + " january"
    case "02":
      return day + " february"
    case "03":
      return day + " march"
    case "04":
      return day + " april"
    case "05":
      return day + " may"
    case "06":
      return day + " june"
    case "07":
      return day + " july"
    case "08":
      return day + " august"
    case "09":
      return day + " september"
    case "10":
      return day + " october"
    case "11":
      return day + " november"
    case "12":
      return day + " december"
    default:
      return ""
  }
}
