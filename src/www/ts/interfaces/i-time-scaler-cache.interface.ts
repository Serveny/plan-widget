import { DateHelper } from '../classes/date-helper/date-helper.class'

export interface ITimeScalerCache {
  dateMonthFormat: Intl.DateTimeFormat
  dateDayFormat: Intl.DateTimeFormat
  dateHourFormat: Intl.DateTimeFormat
  dateHourMinSecFormat: Intl.DateTimeFormat

  startDate: Date
  endDate: Date
  horizonSec: number

  focusStartDate: Date
  focusEndDate: Date
  focusHorizonSec: number

  dateHelper: DateHelper
}
