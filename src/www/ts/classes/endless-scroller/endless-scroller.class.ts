import Hlp from '../helper.class'
import { EsCell } from './es-cell.class'

export class EndlessScroller {
  readonly el = Hlp.createDiv('plw-endless-scroller')
  private elLeft = 0
  private widthCellPx = 100
  private cells: EsCell[] = []

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
    this.el.addEventListener('wheel', ev =>
      this.zoom(ev.x, ev.deltaY > 0 ? 1.1 : 0.9))
    parentEl.appendChild(this.el)
    this.paint()
    return this
  }

  move(x: number): void {
    const movePx = x - this.clickPosPx
    this.clickPosPx = x
    this.cells.forEach(cell => cell.movePos(movePx))
    this.extendIfNeeded()
  }

  zoom(x: number, factor: number): void {
    const midCell = this.findMidCell(x - this.elLeft)
    if (midCell != null) this.zoomByMidCell(midCell, factor)
  }

  private extendIfNeeded(): void {
    if (this.isExtendStart()) this.extendStart()
    else if (this.isExtendEnd()) this.extendEnd()
  }

  private zoomByMidCell(midCell: EsCell, factor: number): void {
    const oldWidth = this.widthCellPx, newWidth = oldWidth * factor
    this.setProps(this.el.offsetWidth, newWidth)
    this.adjustCellCount(this.getCellDiffCount(newWidth))
    this.posByMidCell(midCell, oldWidth, newWidth)
  }

  private adjustCellCount(diffCount: number): void {
    if (diffCount >= 2) this.addCellsStartEnd(diffCount)
    else if (diffCount < -2 && this.cells.length + diffCount 
      >= this.extendElCount * 2.5) 
        this.removeCellsStartEnd(-diffCount)
    this.extendIfNeeded()
  }

  private posByMidCell(midCell: EsCell,
    oldWidth: number, newWidth: number): void {
    let newPos = midCell.posPx - ((newWidth - oldWidth) / 2)
      - (this.cells.indexOf(midCell) * newWidth)
    //console.log(factor, oldWidth, newWidth, newPos)
    this.cells.forEach(cell =>
      newPos = cell.setPosAndWidth(newPos, newWidth))
  }

  private getCellDiffCount(cellWidth: number): number {
    return -Math.ceil((this.cells.length * cellWidth
      - this.el.offsetWidth * 3) / cellWidth)
  }

  private addCellsStartEnd(diffCount: number): void {
    diffCount = ~~(diffCount / 2)
    //console.log('addCellsStartEnd', diffCount)
    this.prependCells(diffCount)
    this.appendCells(diffCount)
    this.sortCells()
  }

  private removeCellsStartEnd(diffCount: number): void {
    diffCount = ~~(diffCount / 2)
    //console.log('removeCellsStartEnd', diffCount)
    this.removeFirstCells(diffCount)
    this.removeLastCells(diffCount)
  }

  private removeFirstCells(count: number): void {
    this.cells.splice(0, count).forEach(cell => cell.el.remove())
    this.firstCell = this.cells[0]
  }

  private removeLastCells(count: number): void {
    this.cells.splice(-count).forEach(cell => cell.el.remove())
    this.lastCell = this.cells[this.cells.length - 1]
  }

  // private isNeedLessCells(): boolean {
  //   return (this.firstCell?.posPx ?? 0) > -this.extendStartPx * 2
  //   || (this.lastCell?.posPx ?? 0) < this.extendEndPx * 2
  // }

  // private reduceCells(): void {
  //   console.log('reduce', this.extendElCount)
  //   this.cells.splice(0, this.extendElCount)
  //     .forEach(delCell => delCell.el.remove())
  //   this.cells.splice(-this.extendElCount)
  //     .forEach(delCell => delCell.el.remove())
  // }

  private findMidCell(relX: number): EsCell | undefined {
    return this.cells.find(cell => relX > cell.posPx
      && relX < cell.posPx + this.widthCellPx)
  }

  private paint(): void {
    const conWidthPx = this.el.offsetWidth
    this.setProps(conWidthPx)
    this.addCellsFromTo(-conWidthPx, conWidthPx * 2)
    this.firstCell = this.cells[0]
    this.lastCell = this.cells[this.cells.length - 1]
  }

  private setProps(conWidthPx: number, cellWidthPx?: number): void {
    this.elLeft = this.el.getBoundingClientRect().left
    this.widthCellPx = cellWidthPx ?? this.widthCellPx
    this.extendElCount = Math.ceil(conWidthPx / this.widthCellPx)
    this.extendStartPx = -this.widthCellPx
    this.extendEndPx = conWidthPx + this.widthCellPx
  }

  private addResizeObserver(): void {
    let oldWidth = this.el.offsetWidth
    new ResizeObserver(() =>
      oldWidth = this.resize(oldWidth)).observe(this.el)
  }

  private resize(oldWidth: number): number {
    const newWidth = this.el.offsetWidth,
      diff = newWidth - oldWidth
    if (diff !== 0) {
      this.setProps(newWidth)
      if (diff > this.widthCellPx) {
        this.appendCellsByWidth(diff)
        oldWidth = newWidth
      } else if (diff < -this.widthCellPx) {
        this.removeCellsByWidth(-diff)
        oldWidth = newWidth
      }
      this.extendIfNeeded()
    }
    return oldWidth
  }

  private appendCellsByWidth(extendedWidth: number): void {
    //console.log('appendCellsByWidth', extendedWidth)
    this.appendCells(Math.ceil(extendedWidth / this.widthCellPx))
  }

  private removeCellsByWidth(reducedWidth: number): void {
    //console.log('removeCellsByWidth', reducedWidth)
    this.removeCells(Math.ceil(reducedWidth / this.widthCellPx))
  }

  private appendCells(count: number): void {
    //console.log('appendCells', count)
    for (let i = 0; i < count; i++) this.lastCell = this.addCell(
      (this.lastCell?.posPx ?? 0) + this.widthCellPx)
  }

  private removeCells(count: number): void {
    //console.log('remove cells:', count)
    if (count > 0) {
      this.cells.splice(-count).forEach(cell => cell.el.remove())
      this.lastCell = this.cells[this.cells.length - 1]
    }
  }

  private prependCells(count: number): void {
    for (let i = 0; i < count; i++) this.firstCell = this.addCell(
      (this.firstCell?.posPx ?? 0) - this.widthCellPx)
  }

  private addCellsFromTo(startPx: number, endPx: number): void {
    //console.log('appendCells', startPx, endPx)
    if (endPx - startPx > this.widthCellPx)
      for (let px = startPx; px < endPx; px += this.widthCellPx) 
        this.addCell(px)
  }

  private addCell(posPx: number): EsCell {
    const cell = new EsCell(posPx, this.widthCellPx)
    this.cells.push(cell)
    this.el.appendChild(cell.el)
    return cell
  }

  private addMove(ev: MouseEvent): void {
    ev.preventDefault()
    this.el.style.cursor = 'grabbing'
    const target = ev.target as HTMLElement
    target.classList.add('plw-es-cell-active')
    this.clickPosPx = ev.x
    const mmHandler = (ev: MouseEvent): void => this.move(ev.x),
      muHandler = (): void => {
        window.removeEventListener('mousemove', mmHandler)
        window.removeEventListener('mouseup', muHandler)
        this.el.style.cursor = ''
        target.classList.remove('plw-es-cell-active')
      }
    window.addEventListener('mousemove', mmHandler)
    window.addEventListener('mouseup', muHandler)
  }

  private isExtendStart(): boolean {
    return (this.firstCell?.posPx ?? 0) > this.extendStartPx
  }

  private isExtendEnd(): boolean {
    return (this.lastCell?.posPx ?? 0) < this.extendEndPx
  }

  private extendStart(): void {
    if (this.firstCell && this.lastCell) {
      for (let i = this.cells.length - this.extendElCount - 1;
        i < this.cells.length; i++) this.firstCell =
          this.placeCellToStart(this.cells[i])
      this.sortCells()
      this.lastCell = this.cells[this.cells.length - 1]
    }
  }

  private extendEnd(): void {
    if (this.firstCell && this.lastCell) {
      for (let i = 0; i < this.extendElCount; i++)
        this.lastCell = this.placeCellToEnd(this.cells[i])
      this.sortCells()
      this.firstCell = this.cells[0]
    }
  }

  private placeCellToStart(cell: EsCell): EsCell {
    cell.posPx = (this.firstCell?.posPx ?? 0) - this.widthCellPx
    return cell
  }

  private placeCellToEnd(cell: EsCell): EsCell {
    cell.posPx = (this.lastCell?.posPx ?? 0) + this.widthCellPx
    return cell
  }

  private sortCells(): void {
    this.cells.sort((a, b): number => a.posPx - b.posPx)
  }
}