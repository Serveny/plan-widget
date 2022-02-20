import { DateHelper } from '../date-helper/date-helper.class'
import Hlp from './../helper.class'

export class CacheService {
  lang = navigator.language
  dateMonthFormat = new Intl.DateTimeFormat(this.lang, {
    month: 'short',
  })
  dateDayFormat = new Intl.DateTimeFormat(this.lang, {
    day: 'numeric',
  })
  dateHourFormat = new Intl.DateTimeFormat(this.lang, {
    hour: '2-digit',
    minute: '2-digit',
  })
  dateHourMinSecFormat = new Intl.DateTimeFormat(this.lang, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  startDate: Date
  endDate: Date
  horizonSec: number

  focusStartDate: Date
  focusEndDate: Date
  focusHorizonSec: number

  dateHelper: DateHelper

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate
    this.endDate = endDate
    this.horizonSec =
      (this.endDate.getTime() - this.startDate.getTime()) / 1000
    this.focusStartDate = this.startDate
    this.focusEndDate = this.endDate
    this.focusHorizonSec = this.horizonSec
    this.dateHelper = new DateHelper(this)
    console.log(
      'cache: ',
      startDate.toLocaleString(),
      endDate.toLocaleString(),
      this.focusHorizonSec
    )
  }

  setHorizon(start: Date, end: Date): void {
    this.startDate = start
    this.endDate = end
    this.horizonSec =
      (this.endDate.getTime() - this.startDate.getTime()) / 1000
  }

  setFocusByDate(start: Date, end: Date): void {
    this.focusStartDate = start
    this.focusEndDate = end
    this.focusHorizonSec =
      (this.focusEndDate.getTime() - this.focusStartDate.getTime()) /
      1000
  }

  setFocusByPct(startPct: number, endPct: number): void {
    this.setFocusByDate(
      Hlp.pctToDate(startPct, this.startDate, this.endDate),
      Hlp.pctToDate(endPct, this.startDate, this.endDate)
    )
  }
}
