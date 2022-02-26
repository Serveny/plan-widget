import { DateHelper } from '../classes/date-helper/date-helper.class'
import { FocusChangedEvent } from '../classes/events/focus-changed.event'

export interface ITimeScalerCache {
  dateMonthFormat: Intl.DateTimeFormat
  dateDayFormat: Intl.DateTimeFormat
  dateHourFormat: Intl.DateTimeFormat
  dateHourMinSecFormat: Intl.DateTimeFormat

  set onChangedFocus(eventHandler: (ev: FocusChangedEvent) => void)
  setFocusByDate(start: Date, end: Date): void

  startDate: Date
  endDate: Date
  horizonSec: number

  focusStartDate: Date
  focusEndDate: Date
  focusHorizonSec: number

  dateHelper: DateHelper
  secondPx: number
  calendarOffsetLeft: number
  calendarWidth: number

  pxToSecond(px: number): number
  getDateByCalendarPosX(x: number): Date
}
