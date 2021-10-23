import { IDataTableColumn, IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import Helper from '../helper.class'
import Hlp from '../helper.class'

export class DtHead {
  private readonly _el: HTMLElement
  get el(): HTMLElement { return this._el }

  constructor(layout: IDataTableLayout | null | undefined) {
    this._el = Hlp.createDiv('dt-head')
    this.fill(layout)
  }

  fill(layout: IDataTableLayout | null | undefined): void {
    const cols = layout?.columns
    this._el.innerHTML = Hlp.isArrNullOrEmpty(cols)
      ? (layout?.title ?? '') : ''
    cols?.filter(col => col.visible === true).forEach(col =>
      this._el.appendChild(this.createHeadCell(col)))
  }

  private createHeadCell(col: IDataTableColumn): HTMLElement {
    const el = Hlp.createDiv('dt-cell', 'dt-head-cell')
    el.style.order = col.visibleIndex.toString()
    el.appendChild(this.createTextEl(
      col.caption ?? `(${col.dataField})`))
    el.appendChild(this.createCellSlider())
    el.style.width = col.width == null ? 'auto' : col.width
    return el
  }

  private createTextEl(text: string): HTMLElement {
    const textEl = Hlp.createDiv('dt-head-cell-text')
    textEl.textContent = text
    textEl.title = text
    textEl.addEventListener('mousedown', ev =>
      this.moveCell(ev))
    return textEl
  }

  private createCellSlider(): HTMLElement {
    const sliderEl = Hlp.createDiv('dt-head-cell-slider')
    sliderEl.addEventListener('mousedown', ev =>
      this.resizeCell(ev))
    return sliderEl
  }

  private resizeCell(ev: MouseEvent): void {
    const cell = (ev.target as HTMLElement).parentElement,
      left = cell?.getBoundingClientRect().left,
      headEl = this._el

    if (cell != null && left != null) { 
      headEl.style.cursor = 'col-resize'
      const mmHandler = (mmEv: MouseEvent): void => {
        const newVal = mmEv.clientX - left
        if(newVal > 0) cell.style.width = `${newVal}px`
      }
      const muHandler = (): void => {
        headEl.style.cursor = ''
        headEl.removeEventListener('mousemove', mmHandler)
        headEl.removeEventListener('mouseup', muHandler)
      }
      headEl.addEventListener('mousemove', mmHandler)      
      headEl.addEventListener('mouseup', muHandler)
    }
  }

  private getDropPosis(): DropPosition[] {
    const cells = Helper.getAsHtmlElementArr(this._el.children)
      .sort((a, b) => 
        parseInt(a.style.order) - parseInt(b.style.order))
    return cells.map((cell, i) => new DropPosition(
      cell.offsetLeft - (cells[i-1]?.offsetWidth ?? 0) / 2,
      parseInt(cell.style.order)
     ))
  }

  private moveCell(ev: MouseEvent): void {
    const dragCell = (ev.target as HTMLElement).parentElement
    //let order = dragCell?.style.order, oldOrder: string
    if (dragCell != null) {
      const headEl = this._el,
        cL = ev.x - dragCell.offsetLeft
      dragCell.style.left = `${ev.x - cL}px`
      dragCell.classList.add('dt-drag-el')
      let //dropCell: HTMLElement, 
        orderDrop = parseInt(dragCell.style.order)
      const dropPosis = this.getDropPosis()
      const mmHandler = (mmEv: MouseEvent): void => {
        dragCell.style.left = `${mmEv.x - cL}px`
        const newOrder = dropPosis.find(pos => 
          pos.px >= mmEv.x)?.order ?? 0
          
        console.log(orderDrop, newOrder)
        if (newOrder !== orderDrop) {
          // if (dropCell != null) dropCell.classList
          //   .remove('dt-drop-before', 'dt-drop-after')
          // newDropCell.classList.add('dt-drop-before')
          orderDrop = newOrder
        }
        //  newOrder = dropCell?.style.order
        // if (!Hlp.isStrNullOrEmpty(newOrder) 
        //   && newOrder !== order && newOrder !== oldOrder
        //   ) {
        //   console.log(order, newOrder)
        //   dropCell.style.order = oldOrder = order ?? '0'
        //   dragCell.style.order = order = newOrder
        // }
      }
      const muHandler = (): void => {
        dragCell.style.left = ''
        dragCell.classList.remove('dt-drag-el')
        headEl.removeEventListener('mousemove', mmHandler)
        headEl.removeEventListener('mouseup', muHandler)
      }
      headEl.addEventListener('mousemove', mmHandler)      
      headEl.addEventListener('mouseup', muHandler)
    }
  }
}

class DropPosition {
  constructor(public px: number, public order: number) {}
}