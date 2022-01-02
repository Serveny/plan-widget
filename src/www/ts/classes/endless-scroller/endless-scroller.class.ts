import Hlp from '../helper.class'
import { EsCell } from './es-cell.class'

export class EndlessScroller {
  readonly el = Hlp.createDiv('plw-endless-scroller')
  set heightPx(heightPx: number) { 
    this.el.style.height = `${heightPx}px`
  }
  private elLeft = 0
  private widthCellPx = 100
  protected cells: EsCell[] = []

  private _extendElCount = 1
  protected get extendElCount(): number { return this._extendElCount }
  private extendStartPx = 0
  private extendEndPx = 0
  //private clickPosPx = 0
  private firstCell?: EsCell
  private lastCell?: EsCell

  protected firstFocusCell?: EsCell
  getCellText?: (cellIndex: number) => string

  constructor() {
    //this.addResizeObserver()
    console.log(this)
  }

  appendTo(parentEl: HTMLElement): EndlessScroller {
    // this.el.addEventListener('mousedown', ev => this.addMove(ev))
    // this.el.addEventListener('wheel', ev =>
    //   this.zoom(ev.x, ev.deltaY > 0 ? 1.1 : 0.9))
    parentEl.appendChild(this.el)
    return this
  }

  paint(): void {
    console.log('paint')
    this.cells.forEach(cell => cell.el.remove())
    this.cells = []
    const conWidthPx = this.el.offsetWidth
    this.setProps(conWidthPx)
    this.addCellsFromTo(-conWidthPx, conWidthPx * 2)
    this.firstCell = this.cells[0]
    this.lastCell = this.cells[this.cells.length - 1]
    this.setFirstFocusCellTextPos()
    this.retextAllCells()
  }

  move(movePx: number): void {
    this.cells.forEach(cell => cell.movePos(movePx))
    this.extendIfNeeded()
    this.setFirstFocusCellTextPos()
  }

  // zoom(x: number, factor: number): void {
  //   const relX = x - this.elLeft,  midCell = this.findMidCell(relX)
  //   if (midCell != null) this.zoomByFactor(midCell, factor)
  // }

  zoom(x: number, newCellWidth: number): void {
    const relX = x - this.elLeft,  midCell = this.findMidCell(relX)
    if (midCell != null) this.zoomByMidCell(midCell, newCellWidth)
    this.setFirstFocusCellTextPos()
  }

  resize(oldWidth: number): number {
    if (this.cells.length === 0) {
      this.paint()
      return this.el.offsetWidth
    } else {
      const newWidth = this.el.offsetWidth,
        diff = newWidth - oldWidth
      console.log('diff', diff)
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
      this.setFirstFocusCellTextPos()
    }
    return oldWidth
  }

  protected retextAllCells(): void {
    this.cells.forEach((cell, i) => {
      if (this.getCellText) cell.text = this.getCellText(i)
    })
  }

  private extendIfNeeded(): void {
    if (this.isExtendStart()) this.extendStart()
    else if (this.isExtendEnd()) this.extendEnd()
  }

  // zoomByFactor(midCell: EsCell, factor: number): void {
  //   const oldWidth = this.widthCellPx, newWidth = oldWidth * factor
  //   this.setProps(this.el.offsetWidth, newWidth)
  //   this.adjustCellCount(this.getCellDiffCount(newWidth))
  //   this.posByMidCell(midCell, oldWidth, newWidth)
  // }

  private zoomByMidCell(midCell: EsCell, newCellWidth: number): void {
    const oldWidth = this.widthCellPx
    this.setProps(this.el.offsetWidth, newCellWidth)
    this.adjustCellCount(this.getCellDiffCount(newCellWidth))
    this.posByMidCell(midCell, oldWidth, newCellWidth)
  }

  private adjustCellCount(diffCount: number): void {
    if (diffCount >= 2) this.addCellsStartEnd(diffCount)
    else if (diffCount < -2 && this.cells.length + diffCount
      >= this._extendElCount * 2.9)
      this.removeCellsStartEnd(-diffCount)
    this.extendIfNeeded()
  }

  private posByMidCell(midCell: EsCell, 
    oldWidth: number, newWidth: number): void {
    let newPos = midCell.posPx - ((newWidth - oldWidth) / 2)
      - (this.cells.indexOf(midCell) * newWidth)
    this.cells.forEach(cell =>
      newPos = cell.setPosAndWidth(newPos, newWidth))
  }

  private getCellDiffCount(cellWidth: number): number {
    return -Math.ceil((this.cells.length * cellWidth
      - this.el.offsetWidth * 3) / cellWidth)
  }

  private addCellsStartEnd(diffCount: number): void {
    diffCount = ~~(diffCount / 2)
    this.prependCells(diffCount)
    this.appendCells(diffCount)
    this.sortCells()
  }

  private removeCellsStartEnd(diffCount: number): void {
    diffCount = ~~(diffCount / 2)
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

  private findMidCell(relX: number): EsCell | undefined {
    return this.cells.find(cell => relX > cell.posPx
      && relX < cell.posPx + this.widthCellPx)
  }

  private setProps(conWidthPx: number, cellWidthPx?: number): void {
    this.elLeft = this.el.getBoundingClientRect().left
    this.widthCellPx = cellWidthPx ?? this.widthCellPx
    this._extendElCount = Math.ceil(conWidthPx / this.widthCellPx)
    this.extendStartPx = -this.widthCellPx
    this.extendEndPx = conWidthPx + this.widthCellPx
  }

  // private addResizeObserver(): void {
  //   let oldWidth = this.el.offsetWidth
  //   new ResizeObserver(() =>
  //     oldWidth = this.resize(oldWidth)).observe(this.el)
  // }

  private appendCellsByWidth(extendedWidth: number): void {
    this.appendCells(Math.ceil(extendedWidth / this.widthCellPx))
  }

  private removeCellsByWidth(reducedWidth: number): void {
    this.removeCells(Math.ceil(reducedWidth / this.widthCellPx))
  }

  private appendCells(count: number): void {
    for (let i = 0; i < count; i++) this.lastCell = this.addCell(
      (this.lastCell?.posPx ?? 0) + this.widthCellPx)
  }

  private removeCells(count: number): void {
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
    console.log(startPx, endPx)
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

  // private addMove(ev: MouseEvent): void {
  //   ev.preventDefault()
  //   this.el.style.cursor = 'grabbing'
  //   const target = ev.target as HTMLElement
  //   target.classList.add('plw-es-cell-active')
  //   this.clickPosPx = ev.x
  //   const mmHandler = (ev: MouseEvent): void => this.move(ev.x),
  //     muHandler = (): void => {
  //       window.removeEventListener('mousemove', mmHandler)
  //       window.removeEventListener('mouseup', muHandler)
  //       this.el.style.cursor = ''
  //       target.classList.remove('plw-es-cell-active')
  //     }
  //   window.addEventListener('mousemove', mmHandler)
  //   window.addEventListener('mouseup', muHandler)
  // }

  private isExtendStart(): boolean {
    return (this.firstCell?.posPx ?? 0) > this.extendStartPx
  }

  private isExtendEnd(): boolean {
    return (this.lastCell?.posPx ?? 0) < this.extendEndPx
  }

  private extendStart(): void {
    if (this.firstCell && this.lastCell) {
      for (let i = this.cells.length - this._extendElCount - 1;
        i < this.cells.length; i++) this.firstCell =
          this.placeCellToStart(this.cells[i])
      this.sortCells()
      this.lastCell = this.cells[this.cells.length - 1]
      this.setCellsText(0, this._extendElCount)
    }
  }

  private extendEnd(): void {
    if (this.firstCell && this.lastCell) {
      for (let i = 0; i < this._extendElCount; i++)
        this.lastCell = this.placeCellToEnd(this.cells[i])
      this.sortCells()
      this.firstCell = this.cells[0]
      this.setCellsText(this.cells.length 
        - this._extendElCount, this.cells.length)
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

  private setCellsText(startI: number, count: number): void {
    if (this.getCellText)
      for(let i = startI; i < count; i++) 
        this.cells[i].text = this.getCellText(i)
  }

  private getFirstFocusCell(): EsCell | undefined {
    return this.cells.find(cell => 
      cell.posPx <= 0 && cell.posPx + this.widthCellPx > 0)
  }

  private setFirstFocusCellTextPos(): void {
    if (this.firstFocusCell) {
      this.firstFocusCell.setTextPos(0)
      if (this.firstFocusCell?.posPx > 0 
        || this.firstFocusCell?.posPx + this.widthCellPx <= 0)
        this.firstFocusCell = this.getFirstFocusCell()
    } else this.firstFocusCell = this.getFirstFocusCell()
    this.firstFocusCell?.setTextPos(-this.firstFocusCell.posPx)
  }
}