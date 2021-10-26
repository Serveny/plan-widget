import Hlp from '../helper.class'

export class DtHeadMoveCell {
  readonly dragCellLeft: number
  readonly cells: HTMLElement[]
  readonly dummyEl: HTMLElement
  readonly dragCTxtEl: HTMLElement | null
  readonly orderDrag: number
  readonly dropPosis: DropPosition[]
  readonly dropPreviewEl: HTMLElement
  orderDrop: number

  constructor(
    ev: MouseEvent,
    public readonly dragCell: HTMLElement,
    public readonly headEl: HTMLElement,
  ) {
    this.cells = this.getChildrenAsc(headEl)
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
        this.headEl.removeEventListener('mousemove', mmHandler)
        this.headEl.removeEventListener('mouseup', muHandler)
        this.dropHandler()
      }
    this.headEl.addEventListener('mousemove', mmHandler)
    this.headEl.addEventListener('mouseup', muHandler)
  }

  private startDrag(x: number): void {
    if (this.dragCTxtEl != null) this.dragCTxtEl.style.opacity = '0'
    this.dummyEl.style.left = `${x - this.dragCellLeft}px`
    this.dropPreviewEl.style.left = `${x - this.dragCellLeft}px`
    this.headEl.append(this.dummyEl, this.dropPreviewEl)
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
    this.orderCells(this.orderDrag, this.orderDrop, this.cells)
    this.dragCell.style.order = this.orderDrop.toString()
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
    additor: number, cells: HTMLElement[]): void {
    cells.forEach(cell => {
      const cellOrder = parseInt(cell.style.order)
      if (cellOrder >= orderStart && cellOrder <= orderEnd)
        cell.style.order = (cellOrder + additor).toString()
    })
  }

  private orderCells(orderDrag: number, orderDrop: number,
    cells: HTMLElement[]): void {
    if (orderDrag !== orderDrop) {
      const isUp = orderDrag > orderDrop,
        additor = isUp ? 1 : -1,
        start = isUp ? orderDrop : orderDrag,
        end = isUp ? orderDrag : orderDrop
      this.orderCellsFromTo(start, end, additor, cells)
    }
  }
}

export class DropPosition {
  constructor(
    public px: number, 
    public order: number,
    public previewPx: number
  ) { }
}