import Hlp from '../helper.class'
import { EsCell } from './es-cell.class'

export class EndlessScroller {
  private el = Hlp.createDiv('plw-endless-scroller')
  private widthCellPx = 100
  private cellEls: EsCell[] = []

  private extendElCount = 1
  private extendStartPx = 0
  private extendEndPx = 0
  private clickPosPx = 0
  private firstCell?: EsCell
  private lastCell?: EsCell

  constructor() {
    this.addResizeObserver()
  }

  appendTo(parentEl: HTMLElement): EndlessScroller {
    this.el.addEventListener('mousedown', ev => this.addMove(ev))
    parentEl.appendChild(this.el)
    this.paint()
    return this
  }

  private paint(): void {
    const conWidthPx = this.el.offsetWidth, endPx = conWidthPx * 2
    for (let px = conWidthPx * -1; px < endPx; px += this.widthCellPx)
      this.appendCell(px)
    this.setProps(conWidthPx)
  }

  private setProps(conWidthPx: number): void {
    this.firstCell = this.cellEls[0]
    this.lastCell = this.cellEls[this.cellEls.length - 1]
    this.extendElCount = this.getExtendElCount(conWidthPx)
    this.extendStartPx = this.getExtendStartPx()
    this.extendEndPx = this.getExtendEndPx(conWidthPx)
  }

  private addResizeObserver(): void {
    let oldWidth = this.el.offsetWidth, newWidth = this.el.offsetWidth
    new ResizeObserver(() => {
      newWidth = this.el.offsetWidth
      if (newWidth > oldWidth) this.setProps(newWidth)
      if (newWidth > (oldWidth + this.widthCellPx)) {
        this.fillWidthWithCells(newWidth - oldWidth)
        oldWidth = this.el.offsetWidth
      }
    }).observe(this.el)
  }

  private fillWidthWithCells(extendedWidth: number): void {
    const cellsToAddCount = Math.ceil(
      extendedWidth / this.widthCellPx) 
    for (let i = 0; i < cellsToAddCount; i++) this.appendCell(
      (this.lastCell?.posPx ?? 0) + this.widthCellPx) 
  }

  private getVisibleCellsCount(conWidthPx: number): number {
    return Math.ceil(conWidthPx / this.widthCellPx)
  }

  private appendCell(posPx: number): EsCell {
    const cell = new EsCell(posPx, this.widthCellPx)
    this.cellEls.push(cell)
    this.el.appendChild(cell.el)
    this.lastCell = cell
    return cell
  }

  private addMove(ev: MouseEvent): void {
    ev.preventDefault()
    this.clickPosPx = ev.x
    const mmHandler = (ev: MouseEvent): void => this.move(ev.x),
      muHandler = (): void => {
        window.removeEventListener('mousemove', mmHandler)
        window.removeEventListener('mouseup', muHandler)
      }
    window.addEventListener('mousemove', mmHandler)
    window.addEventListener('mouseup', muHandler)
  }

  private move(x: number): void {
    const movePx = x - this.clickPosPx
    this.clickPosPx = x
    this.cellEls.forEach(cell => cell.movePos(movePx))
    if (this.isExtendStart()) this.extendStart()
    else if (this.isExtendEnd()) this.extendEnd()
  }

  private isExtendStart(): boolean {
    return (this.firstCell?.posPx ?? 0) > this.extendStartPx
  }

  private isExtendEnd(): boolean {
    return (this.lastCell?.posPx ?? 0) < this.extendEndPx
  }

  private getExtendStartPx(): number {
    return this.widthCellPx * (-1)
  }

  private getExtendEndPx(conWidthPx: number): number {
    return conWidthPx + this.widthCellPx
  }

  private getExtendElCount(conWidthPx: number): number {
    return this.getVisibleCellsCount(conWidthPx) - 1
  }

  private extendStart(): void {
    const start = this.cellEls.length - this.extendElCount - 1
    for (let i = start; i < this.cellEls.length; i++)
      this.moveCellToStart(i)
    this.lastCell = this.cellEls[start - 1]
    this.sortCells()
  }

  private extendEnd(): void {
    for (let i = 0; i < this.extendElCount; i++)
      this.moveCellToEnd(i)
    this.firstCell = this.cellEls[this.extendElCount]
    this.sortCells()
  }

  private moveCellToStart(index: number): void {
    this.cellEls[index].posPx =
      (this.firstCell?.posPx ?? 0) - this.widthCellPx
    this.firstCell = this.cellEls[index]
  }

  private moveCellToEnd(index: number): void {
    this.cellEls[index].posPx =
      (this.lastCell?.posPx ?? 0) + this.widthCellPx
    this.lastCell = this.cellEls[index]
  }

  private sortCells(): void {
    this.cellEls.sort((a, b): number => a.posPx - b.posPx)
  }
}