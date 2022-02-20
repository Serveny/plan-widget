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
  private isVisible = true
  private floorDate: (date: Date) => Date
  private nextDate: (date: Date) => Date
  private dateText: (date: Date) => string

  constructor(private cache: ITimeScalerCache) {
    this.el.appendChild(this.cellCon)
    const dtFns = this.cache.dateHelper.getDateFunctions(
      TimeScale.years
    )
    this.floorDate = dtFns.floorToDate
    this.nextDate = dtFns.nextDate
    this.dateText = dtFns.dateText
  }

  appendTo(parentEl: HTMLElement): TsRow {
    parentEl.appendChild(this.el)
    return this
  }

  repaint(): void {
    this.cellCon.innerHTML = ''
    if (this.isVisible) {
      this.fillCellCon()
    }
  }

  show(): void {
    if (!this.isVisible) {
      this.el.style.display = ''
      this.isVisible = true
    }
  }

  hide(): void {
    if (this.isVisible) {
      this.el.style.display = 'none'
      this.isVisible = false
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
      //console.log('setScale', TimeScale[scale])
    }
  }

  private setDateFunctions(scale: TimeScale): void {
    const dtFns = this.cache.dateHelper.getDateFunctions(scale)
    this.floorDate = dtFns.floorToDate
    this.nextDate = dtFns.nextDate
    this.dateText = dtFns.dateText
  }

  private fillCellCon(): void {
    let date = this.floorDate(this.cache.focusStartDate),
      nextDate = this.nextDate(date),
      conWidth = 0
    const endMs = this.cache.focusEndDate.getTime(),
      cellConLeftPx = this.getCellConLeft(date)
    while (date.getTime() < endMs) {
      conWidth += this.createCell(date, nextDate)
      date = nextDate
      nextDate = this.nextDate(date)
    }
    this.cellCon.style.width = `${conWidth}px`
    this.setCellConLeft(cellConLeftPx)
  }

  private getCellWidth(date: Date, nextDate: Date): number {
    return this.timeToPx((nextDate.getTime() - date.getTime()) / 1000)
  }

  private createCell(date: Date, nextDate: Date): number {
    const cellWidth = this.getCellWidth(date, nextDate),
      cell = this.addNewCell(`${cellWidth}px`)
    cell.textContent = this.dateText(date)
    date = nextDate
    nextDate = this.nextDate(date)
    return cellWidth
  }

  private timeToPx(seconds: number): number {
    return (
      (this.el.offsetWidth / this.cache.focusHorizonSec) * seconds
    )
  }

  private getCellConLeft(firstCellDate: Date): number {
    return this.timeToPx(
      (this.cache.focusStartDate.getTime() -
        firstCellDate.getTime()) /
        1000
    )
  }

  private setCellConLeft(leftPx: number): void {
    this.cellCon.style.left = `${-leftPx}px`
    const firstCell = this.cellCon.firstChild as HTMLElement
    if (firstCell) firstCell.style.paddingLeft = `${leftPx}px`
  }

  private addNewCell(cellWidthStr: string): HTMLDivElement {
    const cell = Hlp.createDiv('plw-es-cell')
    cell.style.width = cellWidthStr
    this.cellCon.appendChild(cell)
    return cell
  }
}
