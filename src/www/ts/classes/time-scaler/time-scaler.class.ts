import Hlp from '../helper.class'
import { TsRowsFocus } from './ts-focus.class'
import { TsRow } from './ts-row.class'
import { ITimeScalerCache } from '../../interfaces/i-time-scaler-cache.interface'

export class TimeScaler {
  readonly el: HTMLDivElement
  private rows: [TsRow, TsRow, TsRow]
  private clickPosPx = 0
  private rowsFocus: TsRowsFocus
  private secondPx = 0
  private offsetLeft = 0

  onChangedDate?: (start: Date, end: Date) => void

  constructor(private cache: ITimeScalerCache) {
    this.el = Hlp.createDiv('plw-time-scaler')
    this.rowsFocus = new TsRowsFocus(60, 3)
    this.rows = [new TsRow(cache), new TsRow(cache), new TsRow(cache)]
    this.rows.forEach(row => row.appendTo(this.el))
    this.addResizeObserver()
    this.el.addEventListener('mousedown', ev => this.addMove(ev))
    this.el.addEventListener('wheel', ev =>
      this.zoom(ev.x, ev.deltaY)
    )
  }

  appendTo(containerEl: HTMLElement): void {
    containerEl.appendChild(this.el)
    this.rowsFocus.setActivationPoints(this.el.offsetWidth)
    this.paint()
  }

  paint(): void {
    this.secondPx = this.cache.focusHorizonSec / this.el.offsetWidth
    this.setRowScales()
    this.rows.forEach(row => row.repaint())
  }

  private addResizeObserver(): void {
    new ResizeObserver(() => {
      this.offsetLeft = this.el.getBoundingClientRect().left
      this.rowsFocus.setActivationPoints(this.el.offsetWidth)
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
    const msAdd = this.pxToSecond(movePx) * -1000
    let start = new Date(this.cache.focusStartDate.getTime() + msAdd),
      end = new Date(this.cache.focusEndDate.getTime() + msAdd)
    if (start.getTime() < this.cache.startDate.getTime()) {
      start = this.cache.startDate
      end = Hlp.addSecs(
        this.cache.startDate,
        this.cache.focusHorizonSec
      )
    } else if (end.getTime() > this.cache.endDate.getTime()) {
      start = Hlp.addSecs(
        this.cache.endDate,
        -this.cache.focusHorizonSec
      )
      end = this.cache.endDate
    }
    if (this.onChangedDate) this.onChangedDate(start, end)
    this.rows.forEach(row => row.repaint())
  }

  private pxToSecond(px: number): number {
    return px * this.secondPx
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
    factor = this.cache.focusHorizonSec * factor
    const posMs =
        this.cache.focusStartDate.getTime() +
        this.pxToSecond(x - this.offsetLeft) * 1000,
      halfHorizon = this.cache.focusHorizonSec * 500,
      startMs = posMs - halfHorizon - factor,
      endMs = posMs + halfHorizon + factor
    this.zoomTo(startMs, endMs)
  }

  private zoomTo(startMs: number, endMs: number): void {
    const newHorizonMs = endMs - startMs
    if (newHorizonMs >= this.cache.horizonSec * 1000) {
      startMs = this.cache.startDate.getTime()
      endMs = this.cache.endDate.getTime()
    } else if (newHorizonMs > 1000) {
      if (startMs < this.cache.startDate.getTime()) {
        startMs = this.cache.startDate.getTime()
        endMs = startMs + newHorizonMs
      } else if (endMs > this.cache.endDate.getTime()) {
        endMs = this.cache.endDate.getTime()
        startMs = endMs - newHorizonMs
      }
    } else return
    if (this.onChangedDate)
      this.onChangedDate(new Date(startMs), new Date(endMs))
    this.paint()
  }
}
