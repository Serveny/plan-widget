import { ITimeScalerCache } from '../../interfaces/i-time-scaler-cache.interface'
import { DateHelper } from '../date-helper/date-helper.class'
import { FocusChangedEvent } from '../events/focus-changed.event'
import Hlp from './../helper.class'

export class CacheService implements ITimeScalerCache {
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

  // --- Horizon ---

  private _startDate: Date
  get startDate(): Date {
    return this._startDate
  }

  private _endDate: Date
  get endDate(): Date {
    return this._endDate
  }

  private _horizonSec: number
  get horizonSec(): number {
    return this._horizonSec
  }

  // --- Focus ---

  private _focusStartDate: Date
  get focusStartDate(): Date {
    return this._focusStartDate
  }

  private _focusEndDate: Date
  get focusEndDate(): Date {
    return this._focusEndDate
  }

  private _focusHorizonSec: number
  get focusHorizonSec(): number {
    return this._focusHorizonSec
  }

  dateHelper: DateHelper
  secondPx = 0
  calendarOffsetLeft = 0
  calendarWidth = 0

  private focusEventHandlers: ((ev: FocusChangedEvent) => void)[] = []
  set onChangedFocus(eventHandler: (ev: FocusChangedEvent) => void) {
    this.focusEventHandlers.push(eventHandler)
  }

  constructor(startDate: Date, endDate: Date) {
    this._startDate = startDate
    this._endDate = endDate
    this._horizonSec =
      (this._endDate.getTime() - this._startDate.getTime()) / 1000
    this._focusStartDate = this._startDate
    this._focusEndDate = this._endDate
    this._focusHorizonSec = this._horizonSec
    this.dateHelper = new DateHelper(this)
  }

  setHorizon(start: Date, end: Date): void {
    this._startDate = start
    this._endDate = end
    this._horizonSec =
      (this._endDate.getTime() - this._startDate.getTime()) / 1000
  }

  setFocusByDate(start: Date, end: Date): void {
    this._focusStartDate = start
    this._focusEndDate = end
    const newHorizon = ~~(
        (this._focusEndDate.getTime() -
          this._focusStartDate.getTime()) /
        1000
      ),
      isChangedHorizon = newHorizon !== this._focusHorizonSec
    this._focusHorizonSec = newHorizon
    this.secondPx = this._focusHorizonSec / this.calendarWidth
    this.triggerFocusChanged(isChangedHorizon)
  }

  setFocusByPct(startPct: number, endPct: number): void {
    this.setFocusByDate(
      Hlp.pctToDate(startPct, this._startDate, this._endDate),
      Hlp.pctToDate(endPct, this._startDate, this._endDate)
    )
  }

  pxToSecond(px: number): number {
    return px * this.secondPx
  }

  getDateByCalendarPosX(x: number): Date {
    return new Date(
      this._focusStartDate.getTime() +
        this.pxToSecond(x - this.calendarOffsetLeft) * 1000
    )
  }

  private triggerFocusChanged(isChangedHorizon: boolean): void {
    const ev = new FocusChangedEvent(
      this._focusStartDate,
      this._focusEndDate,
      this._focusHorizonSec,
      isChangedHorizon
    )
    this.focusEventHandlers.forEach(fn => fn(ev))
  }
}
