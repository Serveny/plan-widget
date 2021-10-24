import { IDataTableColumn, IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import Hlp from '../helper.class'
import { DtHeadMoveCell } from './dt-head-move-cell.class'

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
    textEl.addEventListener('mousedown', ev => {
      if (textEl.parentElement != null)
        new DtHeadMoveCell(ev, textEl.parentElement, this._el)
    })
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
        if (newVal > 0) cell.style.width = `${newVal}px`
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


}