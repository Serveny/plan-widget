import Hlp from '../helper.class'
import { TsRowsFocus } from './ts-focus.class'
import { TsRow } from './ts-row.class'
import { ITimeScalerCache } from '../../interfaces/i-time-scaler-cache.interface'

export class TimeScaler {
  readonly el: HTMLDivElement
  private rows: [TsRow, TsRow, TsRow]
  private clickPosPx = 0
  private rowsFocus: TsRowsFocus

  onChangedDate?: (start: Date, end: Date) => void

  constructor(private cache: ITimeScalerCache) {
    this.el = Hlp.createDiv('plw-time-scaler')
    this.rowsFocus = new TsRowsFocus(60, 3)
    this.rows = [
      new TsRow(this.cache),
      new TsRow(this.cache),
      new TsRow(this.cache),
    ]
    this.rows.forEach(row => row.appendTo(this.el))
    this.addResizeObserver()
    this.el.addEventListener('mousedown', ev => this.addMove(ev))
    this.el.addEventListener('wheel', ev =>
      this.zoom(ev.x, ev.deltaY)
    )
  }

  appendTo(containerEl: HTMLElement): void {
    containerEl.appendChild(this.el)
    const rect = this.el.getBoundingClientRect()
    this.cache.calendarOffsetLeft = rect.left
    this.cache.calendarWidth = this.el.offsetWidth
    this.rowsFocus.setActivationPoints(this.el.offsetWidth)
    this.paint()
  }

  paint(): void {
    this.setRowScales()
    this.rows.forEach(row => row.repaint())
  }

  private addResizeObserver(): void {
    new ResizeObserver(() => {
      const rect = this.el.getBoundingClientRect()
      this.cache.calendarOffsetLeft = rect.left
      this.cache.calendarWidth = this.el.offsetWidth
      this.rowsFocus.setActivationPoints(rect.width)
      this.paint()
    }).observe(this.el)
  }

  private addMove(ev: MouseEvent): void {
    ev.preventDefault()
    this.el.style.cursor = 'grabbing'
    this.clickPosPx = ev.x
    const mmHandler = (ev: MouseEvent): void => {
        const movePx = ev.x - this.clickPosPx
        this.moveByPx(movePx)
        this.clickPosPx = ev.x
      },
      muHandler = (): void => {
        window.removeEventListener('mousemove', mmHandler)
        window.removeEventListener('mouseup', muHandler)
        this.el.style.cursor = ''
      }
    window.addEventListener('mousemove', mmHandler)
    window.addEventListener('mouseup', muHandler)
  }

  private moveByPx(movePx: number): void {
    const cache = this.cache,
      msAdd = cache.pxToSecond(movePx) * -1000
    let start = new Date(cache.focusStartDate.getTime() + msAdd),
      end = new Date(cache.focusEndDate.getTime() + msAdd)
    if (start.getTime() < cache.startDate.getTime()) {
      start = cache.startDate
      end = Hlp.addSecs(cache.startDate, cache.focusHorizonSec)
    } else if (end.getTime() > cache.endDate.getTime()) {
      start = Hlp.addSecs(cache.endDate, -cache.focusHorizonSec)
      end = cache.endDate
    }
    if (this.onChangedDate) this.onChangedDate(start, end)
    this.rows.forEach(row => row.repaint())
  }

  private setRowScales(): void {
    const scales = this.rowsFocus.getRowScales(
      this.cache.focusHorizonSec
    )
    this.rows.forEach((row: TsRow, i: number) =>
      row.setScaleAndHeight(scales.rows[i], scales.rowHeight)
    )
  }

  private zoom(x: number, factor: number): void {
    const cache = this.cache,
      posMs = cache.getDateByCalendarPosX(x).getTime(),
      halfHorizon = cache.focusHorizonSec * 500
    factor = cache.focusHorizonSec * factor
    const startMs = posMs - halfHorizon - factor,
      endMs = posMs + halfHorizon + factor
    this.zoomTo(startMs, endMs)
  }

  private zoomTo(startMs: number, endMs: number): void {
    const newHorizonMs = endMs - startMs,
      cache = this.cache
    if (newHorizonMs >= cache.horizonSec * 1000) {
      startMs = cache.startDate.getTime()
      endMs = cache.endDate.getTime()
    } else if (newHorizonMs > 1000) {
      if (startMs < cache.startDate.getTime()) {
        startMs = cache.startDate.getTime()
        endMs = startMs + newHorizonMs
      } else if (endMs > cache.endDate.getTime()) {
        endMs = cache.endDate.getTime()
        startMs = endMs - newHorizonMs
      }
    } else return
    if (this.onChangedDate)
      this.onChangedDate(new Date(startMs), new Date(endMs))
    this.paint()
  }
}
