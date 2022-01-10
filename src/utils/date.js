import { endOfISOWeek, format, startOfISOWeek, startOfYear, subWeeks } from 'date-fns'

export const DIFF_DAY = 24 * 60 * 60 * 1000
export const DIFF_5_DAYS = 5 * DIFF_DAY
export const DIFF_10_DAYS = 10 * DIFF_DAY
export const DAYS_AGO = 365

export const isOverDiff = (timestamp, diff) => {
  const now = new Date().getTime()
  return now - timestamp > diff
}

const getWeekDateAndTimestamp = (week) => {
  let startWeek
  let endWeek
  if (week !== 0) {
    startWeek = startOfISOWeek(subWeeks(new Date(), week))
    const endWeekDate = endOfISOWeek(subWeeks(new Date(), week))
    endWeek = new Date(endWeekDate.getFullYear(), endWeekDate.getMonth(), endWeekDate.getDate(), 23, 59, 59)
  } else {
    startWeek = startOfISOWeek(new Date())
    const endWeekDate = endOfISOWeek(new Date())
    endWeek = endWeekDate
  }

  return {
    start: parseInt(format(startWeek, 'yyyyMMdd').valueOf()),
    end: parseInt(format(endWeek, 'yyyyMMdd').valueOf()),
    startTimestamp: startWeek.valueOf(),
    endTimestamp: endWeek.valueOf(),
  }
}

export const getLast4weeksDate = () => {
  const day = new Date().getDay()
  let tableWeek = []
  if (day >= 1 && day <= 3) {
    tableWeek = [4, 3, 2, 1]
  } else {
    tableWeek = [3, 2, 1, 0]
  }

  const dates = tableWeek.map(getWeekDateAndTimestamp)

  return dates
}

export const getStartDateOfYear = () => parseInt(format(startOfYear(new Date()), 'yyyyMMdd'))

export const getStartDateOfYearTimestamp = () => parseInt(startOfYear(new Date()).valueOf())

export const getDateString = (date) => {
  let day = date.toString().substring(6, 7).replace('0', '')
  day = `${day}${date.toString().substring(7, 8)}`

  const month = date.toString().substring(4, 6)

  switch (month) {
    case '01':
      return `${day} January`
    case '02':
      return `${day} February`
    case '03':
      return `${day} March`
    case '04':
      return `${day} April`
    case '05':
      return `${day} May`
    case '06':
      return `${day} June`
    case '07':
      return `${day} July`
    case '08':
      return `${day} August`
    case '09':
      return `${day} September`
    case '10':
      return `${day} October`
    case '11':
      return `${day} November`
    case '12':
      return `${day} December`
    default:
      return ''
  }
}
