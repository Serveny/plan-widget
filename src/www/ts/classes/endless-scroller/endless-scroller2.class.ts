import Hlp from '../helper.class'

export abstract class EndlessScroller {
  protected el = Hlp.createDiv('plw-endless-scroller')
  protected cellCon = Hlp.createDiv('plw-es-cell-con')
  protected cells: HTMLDivElement[] = []
  protected cellWidth = 0
  set heightPx(heightPx: number) {
    this.el.style.height = `${heightPx}px`
  }

  constructor() {
    this.el.appendChild(this.cellCon)
  }

  appendTo(parentEl: HTMLElement): EndlessScroller {
    parentEl.appendChild(this.el)
    return this
  }

  repaint(): void {
    this.removeAllCells()
    const widthStr = `${this.cellWidth}px`,
      cellCount = Math.floor(this.el.offsetWidth / this.cellWidth) + 1
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
}
