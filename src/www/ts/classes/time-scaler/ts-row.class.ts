import { TimeScale } from '../../enums/time-scale.enum'
import { ITimeScalerCache } from '../../interfaces/i-time-scaler-cache.interface'
import Hlp from '../helper.class'

export class TsRow {
  private el = Hlp.createDiv('plw-endless-scroller')
  private cellCon = Hlp.createDiv('plw-es-cell-con')
  private cells: HTMLDivElement[] = []
  private cellWidth = 0
  set heightPx(heightPx: number) {
    this.el.style.height = `${heightPx}px`
    this.el.style.lineHeight = `${heightPx}px`
  }

  private _isVisible = true
  private _scale: TimeScale = TimeScale.none
  private _scaleMS = 0

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
    this.removeAllCells()
    if (this._isVisible) {
      this.fillCellCon()
      this.paint()
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

  paint(): void {
    if (this._isVisible) {
      this.retextCells()
      this.moveCellCon()
    }
  }

  setScaleAndHeight(
    scale: TimeScale | undefined,
    heightPx: number
  ): void {
    if (!scale) this.hide()
    else {
      this.show()
      this._scale = scale
      this._scaleMS = scale * 1000
      this.cellWidth = this.getCellWidth(scale)
      this.heightPx = heightPx
      this.setDateFunctions(scale)
      //console.log('setScale', this._scale, this.cellWidth)
    }
  }

  private setDateFunctions(scale: TimeScale): void {
    const dtFns = this.cache.dateHelper.getDateFunctions(scale)
    this._floorDate = dtFns.floorToDate
    this._nextDate = dtFns.nextDate
    this._dateText = dtFns.dateText
  }

  private fillCellCon(): void {
    const widthStr = `${this.cellWidth}px`,
      cellCount = Math.ceil(this.el.offsetWidth / this.cellWidth) + 1
    this.cellCon.style.left = `0px`
    this.cellCon.style.width = `${cellCount * this.cellWidth}px`
    for (let i = 0; i < cellCount; i++) this.addNewCell(widthStr)
  }

  private removeAllCells(): void {
    this.cells.forEach(cell => cell.remove())
    this.cells = []
  }

  private addNewCell(cellWidthStr: string): HTMLDivElement {
    const cell = Hlp.createDiv('plw-es-cell')
    cell.style.width = cellWidthStr
    this.cells.push(cell)
    this.cellCon.appendChild(cell)
    return cell
  }

  private getCellWidth(scale: TimeScale): number {
    return this.el.offsetWidth / (this.cache.focusHorizonSec / scale)
  }

  private retextCells(): void {
    let date = this._floorDate(this.cache.focusStartDate)
    //console.log('sdfa', this.cache.focusStartDate, date)
    this.cells.forEach(cell => {
      cell.textContent = this._dateText(date)
      date = this._nextDate(date)
    })
  }

  private moveCellCon(): void {
    const leftPx =
      this.cellWidth *
      ((this.cache.focusStartDate.getTime() % this._scaleMS) /
        this._scaleMS)
    this.cells[0].style.paddingLeft = `${leftPx}px`
    this.cellCon.style.left = `${-leftPx}px`
  }
}
