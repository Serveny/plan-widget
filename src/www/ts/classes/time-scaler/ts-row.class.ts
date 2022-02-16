import { TimeScale } from '../../enums/time-scale.enum'
import { ITimeScalerCache } from '../../interfaces/i-time-scaler-cache.interface'
import Hlp from '../helper.class'

export class TsRow {
  set heightPx(heightPx: number) {
    this.el.style.height = `${heightPx}px`
    this.el.style.lineHeight = `${heightPx}px`
  }
  private el = Hlp.createDiv('plw-endless-scroller')
  private cellCon = Hlp.createDiv('plw-es-cell-con')
  private _isVisible = true
  private _floorDate: (date: Date) => Date
  private _nextDate: (date: Date) => Date
  private _dateText: (date: Date) => string

  constructor(private cache: ITimeScalerCache) {
    this.el.appendChild(this.cellCon)
    const dtFns = this.cache.dateHelper
      .getDateFunctions(TimeScale.years)
    this._floorDate = dtFns.floorToDate
    this._nextDate = dtFns.nextDate
    this._dateText = dtFns.dateText
  }

  appendTo(parentEl: HTMLElement): TsRow {
    parentEl.appendChild(this.el)
    return this
  }

  repaint(): void {
    this.cellCon.innerHTML = ''
    if (this._isVisible) {
      this.fillCellCon()
    }
  }

  show(): void {
    if (!this._isVisible) {
      this.el.style.display = ''
      this._isVisible = true
    }
  }

  hide(): void {
    if (this._isVisible) {
      this.el.style.display = 'none'
      this._isVisible = false
    }
  }

  setScaleAndHeight(
    scale: TimeScale | undefined,
    heightPx: number
  ): void {
    if (!scale) this.hide()
    else {
      this.show()
      this.heightPx = heightPx
      this.setDateFunctions(scale)
      console.log('setScale', TimeScale[scale])
    }
  }

  private setDateFunctions(scale: TimeScale): void {
    const dtFns = this.cache.dateHelper.getDateFunctions(scale)
    this._floorDate = dtFns.floorToDate
    this._nextDate = dtFns.nextDate
    this._dateText = dtFns.dateText
  }

  private fillCellCon(): void {
    let date = this._floorDate(this.cache.focusStartDate),
      nextDate = this._nextDate(date), conWidth = 0
    const endMs = this.cache.focusEndDate.getTime(),
      cellConLeftPx = this.getCellConLeft(date)
    while (date.getTime() < endMs) {
      conWidth += this.createCell(date, nextDate)
      date = nextDate
      nextDate = this._nextDate(date)
    }
    this.cellCon.style.width = `${conWidth}px`
    this.setCellConLeft(cellConLeftPx)
  }

  private getCellWidth(date: Date, nextDate: Date): number {
    return this.timeToPx(
      (nextDate.getTime() - date.getTime()) / 1000)
  }

  private createCell(date: Date, nextDate: Date): number {
    const cellWidth = this.getCellWidth(date, nextDate),
      cell = this.addNewCell(`${cellWidth}px`)
    cell.textContent = this._dateText(date)
    date = nextDate
    nextDate = this._nextDate(date)
    return cellWidth
  }

  private timeToPx(seconds: number): number {
    return (this.el.offsetWidth
      / this.cache.focusHorizonSec) * seconds
  }

  private getCellConLeft(firstCellDate: Date): number {
    return this.timeToPx(
      (this.cache.focusStartDate.getTime() - firstCellDate.getTime())
      / 1000)
  }

  private setCellConLeft(leftPx: number): void {
    this.cellCon.style.left = `${-leftPx}px`;
    (this.cellCon.firstChild as HTMLElement)
      .style.paddingLeft = `${leftPx}px`
  }

  private addNewCell(cellWidthStr: string): HTMLDivElement {
    const cell = Hlp.createDiv('plw-es-cell')
    cell.style.width = cellWidthStr
    this.cellCon.appendChild(cell)
    return cell
  }
}
