import { TimeScale } from '../../enums/time-scale.enum'
import { ITimeScalerCache } from '../../interfaces/i-time-scaler-cache.interface'
import Hlp from '../helper.class'
import DtHlp from '../date-helper.class'

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

  constructor(private cache: ITimeScalerCache) {
    this.el.appendChild(this.cellCon)
  }

  // zoomByScale(x: number, scale: TimeScale | undefined,
  //   rowHeightPx?: number): void {
  //   if (scale == null) this.hide()
  //   else {
  //     this.show()
  //     if (rowHeightPx) this.heightPx = rowHeightPx
  //     this.zoom(x, this.getBlockWidth(scale,
  //       this.cache.focusHorizonSec))
  //     if (this.scale !== scale) {
  //       console.log('retextAllCells', TimeScale[scale])
  //       this.scale = scale
  //       this.retextAllCells()
  //     }
  //   }
  // }

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

  setScaleAndHeight(scale: TimeScale | undefined,
    heightPx: number): void {
    if (!scale) this.hide()
    else {
      this.show()
      this._scale = scale
      this._scaleMS = scale * 1000
      this.cellWidth = this.getCellWidth(scale)
      this.heightPx = heightPx
      //console.log('setScale', this._scale, this.cellWidth)
    }
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
    return this.el.offsetWidth
      / (this.cache.focusHorizonSec / scale)
  }

  private getCellDateText(date: Date): string {
    switch (this._scale) {
      case TimeScale.years: 
        console.log('Text Year', date, date.getFullYear())
        return date.getFullYear().toString()
      case TimeScale.quarters:
        return `Q ${Math.ceil((date.getMonth() + 1) / 3)}`
      case TimeScale.months:
        return this.cache.dateMonthFormat.format(date)
      case TimeScale.weeks:
        return `W ${date.getUTCDay()}`
      case TimeScale.days:
        return this.cache.dateDayFormat.format(date)
      case TimeScale.halfDays:
      case TimeScale.fourthDays:
      case TimeScale.eighthDays:
      case TimeScale.twelfthDays:
      case TimeScale.hours:
      case TimeScale.halfHours:
      case TimeScale.fourthHours:
      case TimeScale.sixthHours:
      case TimeScale.twelfthHours:
      case TimeScale.minutes:
      case TimeScale.halfMinutes:
      case TimeScale.fourthMinutes:
      case TimeScale.sixthMinutes:
      case TimeScale.twelfthMinutes:
      case TimeScale.seconds:
        return this.cache.dateHourMinSecFormat.format(date)
      case TimeScale.none:
        return 'No Scale'
      default: throw Error('createText: Unknown Scale')
    }
  }

  private retextCells(): void {
    let timeMS = this.getDrawStartTimeMS()
    console.log('sdfa', this.cache.focusStartDate, new Date(timeMS))
    this.cells.forEach(cell => {
      cell.textContent = this.getCellDateText(new Date(timeMS))
      timeMS += this._scaleMS
    })
  }

  private getDrawStartTimeMS(): number {
    return this.cache.focusStartDate.getTime() - (
      this.cache.focusStartDate.getTime() % this._scaleMS)
  }

  private moveCellCon(): void {
    const leftPx = this.cellWidth *
      ((this.cache.focusStartDate.getTime() % this._scaleMS)
        / this._scaleMS)
    this.cells[0].style.paddingLeft = `${leftPx}px`
    this.cellCon.style.left = `${-leftPx}px`
  }
}