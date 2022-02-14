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
  private oldFocusSec = 0

  onChangedDate?: (start: Date, end: Date) => void

  constructor(private cache: ITimeScalerCache) {
    this.el = Hlp.createDiv('plw-time-scaler')
    this.rowsFocus = new TsRowsFocus(60, 3)
    this.rows = [new TsRow(cache), new TsRow(cache), new TsRow(cache)]
    this.rows.forEach(row => row.appendTo(this.el))
    this.addResizeObserver()
    this.el.addEventListener('mousedown', ev => this.addMove(ev))
    // this.el.addEventListener('wheel', ev =>
    //   this.zoom(ev.x, ev.deltaY > 0 ? 1.1 : 0.9))
  }

  appendTo(containerEl: HTMLElement): void {
    containerEl.appendChild(this.el)
    this.paint()
  }

  paint(): void {
    this.secondPx = this.cache.focusHorizonSec / this.el.offsetWidth
    this.setRowScales()
    if (~~this.oldFocusSec === ~~this.cache.focusHorizonSec)
      this.rows.forEach(row => row.paint())
    else {
      this.rows.forEach(row => row.repaint())
      this.oldFocusSec = this.cache.focusHorizonSec
    }
    //console.log(this.secondPx)
  }

  private addResizeObserver(): void {
    new ResizeObserver(() =>
      this.rows.forEach(row => row.repaint())
    ).observe(this.el)
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
    this.rows.forEach(row => row.paint())
    if (this.onChangedDate) this.onChangedDate(start, end)
  }

  private pxToSecond(px: number): number {
    return px * this.secondPx
  }

  private setRowScales(): void {
    const scales = this.rowsFocus.getRowScales(
      this.cache.focusHorizonSec
    )
    this.rows.forEach((row, i) =>
      row.setScaleAndHeight(scales.rows[i], scales.rowHeight)
    )
  }

  // private zoom(x: number, factor: number): void {
  //   const scales = this.rowsFocus.getRowScales(
  //     this.cache.focusHorizonSec)
  //   this.rows.forEach((row, i) =>
  //     row.zoomByScale(x, scales.rows[i], scales.rowHeight))
  // }
}
