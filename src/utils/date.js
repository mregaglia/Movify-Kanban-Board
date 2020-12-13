import moment from 'moment';

export const DIFF_DAY = 24 * 60 * 60 * 1000;
export const DIFF_5_DAYS = 5 * DIFF_DAY;
export const DIFF_10_DAYS = 10 * DIFF_DAY;
export const DAYS_AGO = 365
const time = '23:59:59'

export const isOverDiff = (timestamp, diff) => {
  const now = new Date().getTime();
  return now - timestamp > diff;
};

export const getLast4weeksDate = () => {
  let day = moment().day()
  console.log(day)
  let tableWeek = []
  if (day >= 1 && day <= 3) {
    tableWeek = [4, 3, 2, 1]
  } else {
    tableWeek = [3, 2, 1, 0]
  }

  let dates = tableWeek.map(getWeekDateAndTimestamp)

  return dates;
}

export const getDateFrom365daysAgo = () => {
  return moment().subtract(1, 'years').format("YYYYDDMM")
}

const getWeekDateAndTimestamp = (week) => {
  let startWeek, endWeek
  if (week !== 0) {
    startWeek = moment().subtract(week, 'weeks').startOf('isoWeek')
    let endWeekDate = moment().subtract(week, 'weeks').endOf('isoWeek')
    endWeek = getEndWeekDataWithTime(endWeekDate)
  } else {
    startWeek = moment().startOf('isoWeek')
    let endWeekDate = moment().endOf('isoWeek')
    endWeek = getEndWeekDataWithTime(endWeekDate)
  }

  return {
    start: parseInt(startWeek.format('YYYYMMDD')),
    end: parseInt(endWeek.format('YYYYMMDD')),
    startTimestamp: startWeek.valueOf(),
    endTimestamp: endWeek.valueOf()
  }
}

const getEndWeekDataWithTime = (date) => {
  var now = date.format('YYYY-MM-DD')
  return moment(now + ' ' + time)
}

export const getStartDateOfYear = () => {
  return parseInt(moment().startOf('year').format('YYYYMMDD'))
}

export const getStartDateOfYearTimestamp = () => {
  return parseInt(moment().startOf('year').valueOf())
}

export const getDateString = (date) => {
  
  let day = date.toString().substring(6, 7).replace('0', '')
  day = day + "" + date.toString().substring(7, 8)

  let month = date.toString().substring(4, 6);

  switch (month) {
    case "01":
      return day + " January"
    case "02":
      return day + " February"
    case "03":
      return day + " March"
    case "04":
      return day + " April"
    case "05":
      return day + " May"
    case "06":
      return day + " June"
    case "07":
      return day + " July"
    case "08":
      return day + " August"
    case "09":
      return day + " September"
    case "10":
      return day + " October"
    case "11":
      return day + " November"
    case "12":
      return day + " December"
    default:
      return ""
  }
}
