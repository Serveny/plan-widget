import { IDataTableColumn } from '../../interfaces/i-data-table-layout.interface'
import Hlp from '../helper.class'
import { DtBodyCell } from './dt-body-cell.class'
import { DtService } from './dt-service.class'

export class DtHeadMoveCell {
  private readonly dragCellLeft: number
  private readonly cells: HTMLElement[]
  private readonly dummyEl: HTMLElement
  private readonly dragCTxtEl: HTMLElement | null
  private readonly orderDrag: number
  private readonly dropPosis: DropPosition[]
  private readonly dropPreviewEl: HTMLElement
  private orderDrop: number

  constructor(
    ev: MouseEvent,
    private readonly dragCell: HTMLElement,
    private readonly dts: DtService
  ) {
    this.cells = this.getChildrenAsc(this.dts.head.el)
    this.dragCellLeft = ev.x - dragCell.offsetLeft,
      this.dummyEl = this.createMoveDummy(
        dragCell.textContent, dragCell.offsetWidth)
    this.dragCTxtEl = dragCell.querySelector(
      '.dt-head-cell-text') as HTMLElement | null
    this.orderDrag = parseInt(dragCell.style.order)
    this.dropPosis = this.getDropPosis().reverse()
    this.dropPreviewEl = Hlp.createDiv('dt-head-drop-preview')
    this.orderDrop = this.orderDrag
    this.addEventListeners()
    this.startDrag(ev.x)
  }

  private addEventListeners(): void {
    const mmHandler = (ev: MouseEvent): void =>
      this.dragHandler(ev.x), muHandler = (): void => {
        window.removeEventListener('mousemove', mmHandler)
        window.removeEventListener('mouseup', muHandler)
        this.dropHandler()
      }
    window.addEventListener('mousemove', mmHandler)
    window.addEventListener('mouseup', muHandler)
  }

  private startDrag(x: number): void {
    if (this.dragCTxtEl != null) this.dragCTxtEl.style.opacity = '0'
    this.dummyEl.style.left = `${x - this.dragCellLeft}px`
    this.dropPreviewEl.style.left = `${x - this.dragCellLeft}px`
    this.dts.head.el.append(this.dummyEl, this.dropPreviewEl)
  }

  private dragHandler(x: number): void {
    this.moveDummyTo(x)
    const newOrder = this.getDropOrderByPx(x)

    if (newOrder != null && newOrder !== this.orderDrop) {
      this.orderDrop = newOrder
      this.posDropPreview()
    }
  }

  private dropHandler(): void {
    const moves = this.orderCells(this.orderDrag, this.orderDrop, this.cells)
    this.dragCell.style.order = this.orderDrop.toString()
    moves.push(new Move(this.orderDrag, this.orderDrop))
    this.fillMoves(moves)
    this.moveBodyCols(moves)
    this.refreshLayout(moves)
    if (this.dragCTxtEl != null) this.dragCTxtEl.style.opacity = '1'
    this.dummyEl.remove()
    this.dropPreviewEl.remove()
  }

  private moveDummyTo(x: number): void {
    this.dummyEl.style.left = `${x - this.dragCellLeft}px`
  }

  private posDropPreview(): void {
    this.dropPreviewEl.style.left =
      `${this.orderDrop === this.orderDrag
        ? this.dragCell.offsetLeft
        : this.getPreviewPxByOrder(this.orderDrop)
      }px`
  }

  private getDropOrderByPx(x: number): number | undefined {
    return this.dropPosis.find(pos => pos.px <= x)?.order
  }

  private getPreviewPxByOrder(order: number): number | undefined {
    return this.dropPosis.find(pos => pos.order === order)?.previewPx
  }

  private getChildrenAsc(el: HTMLElement): HTMLElement[] {
    return Hlp.orderByOrderAsc(
      Hlp.getAsHtmlElementArr(el.children))
  }

  private createMoveDummy(
    text: string | null, width: number): HTMLElement {
    const dummy = Hlp.createDiv(
      'dt-cell', 'dt-head-cell', 'dt-drag-el'),
      textEl = Hlp.createDiv('dt-head-cell-text')
    textEl.textContent = text
    dummy.style.width = `${width}px`
    dummy.appendChild(textEl)
    return dummy
  }

  private getDropPosis(): DropPosition[] {
    let lastWidth: number | undefined, lastOrder: number | undefined
    const posis = this.cells.map(cell => {
      const order = parseInt(cell.style.order)
      const dp = new DropPosition(
        cell.offsetLeft - (lastWidth ?? 0) / 2,
        order > this.orderDrag ? lastOrder ?? 0 : order,
        cell.offsetLeft)
      lastWidth = cell.offsetWidth
      lastOrder = order
      return dp
    })
    const lastCell = this.cells[this.cells.length - 1]
    posis.push(new DropPosition(
      lastCell.offsetLeft + (lastCell.offsetWidth / 2),
      lastOrder ?? 0,
      lastCell.offsetLeft + lastCell.offsetWidth
    ))
    return posis
  }

  private orderCellsFromTo(orderStart: number, orderEnd: number,
    additor: number, cells: HTMLElement[]): Move[] {
    const moves: Move[] = []
    cells.forEach(cell => {
      const cellOrder = parseInt(cell.style.order)
      if (cellOrder >= orderStart && cellOrder <= orderEnd) {
        const newOrder = cellOrder + additor
        cell.style.order = newOrder.toString()
        moves.push(new Move(cellOrder, newOrder))
      }
    })
    return moves
  }

  private orderCells(orderDrag: number, orderDrop: number,
    cells: HTMLElement[]): Move[] {
    if (orderDrag !== orderDrop) {
      const isUp = orderDrag > orderDrop,
        additor = isUp ? 1 : -1,
        start = isUp ? orderDrop : orderDrag,
        end = isUp ? orderDrag : orderDrop
      return this.orderCellsFromTo(start, end, additor, cells)
    } else return []
  }

  private fillMoves(moves: Move[]): void {
    moves.forEach(mv => {
      mv.cells = this.dts.getBodyCellsByOrder(mv.fromOrder)
      mv.col = this.dts.layout?.columns?.find(col =>
        col.visibleIndex === mv.fromOrder)
    })
  }

  private moveBodyCols(moves: Move[]): void {
    moves.forEach(mv => mv.cells.forEach(cell => cell.order = mv.toOrder))
  }

  private refreshLayout(moves: Move[]): void {
    if (this.dts.layout != null) moves.forEach(mv => {
      if (mv.col != null) mv.col.visibleIndex = mv.toOrder
    })
  }
}

class DropPosition {
  constructor(
    public px: number,
    public order: number,
    public previewPx: number,
  ) { }
}

class Move {
  cells: DtBodyCell[] = []
  col?: IDataTableColumn
  constructor(
    public fromOrder: number,
    public toOrder: number,
  ) { }
}