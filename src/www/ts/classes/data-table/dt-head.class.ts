import { IDataTableColumn, IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import Helper from '../helper.class'

export class DtHead {
  private readonly _el: HTMLElement
  get el(): HTMLElement { return this._el }

  constructor(layout: IDataTableLayout | null | undefined) {
    this._el = Helper.createDiv('dt-head')
    this.fill(layout)
  }

  fill(layout: IDataTableLayout | null | undefined): void {
    const cols = layout?.columns
    this._el.innerHTML = Helper.isArrNullOrEmpty(cols)
      ? '' : (layout?.title ?? '')
    cols?.filter(col => col.visible === true).forEach(col =>
      this._el.appendChild(this.createHeadCell(col)))
  }

  private createHeadCell(col: IDataTableColumn): HTMLElement {
    const el = Helper.createDiv('dt-cell', 'dt-head-cell')
    el.appendChild(this.createTextEl(
      col.caption ?? `(${col.dataField})`))
    el.appendChild(this.createCellSlider())
    el.style.width = col.width == null ? 'auto' : col.width
    return el
  }

  private createTextEl(text: string): HTMLElement {
    const textEl = Helper.createDiv('dt-head-cell-text')
    textEl.textContent = text
    textEl.title = text
    return textEl
  }

  private createCellSlider(): HTMLElement {
    const sliderEl = Helper.createDiv('dt-head-cell-slider')
    sliderEl.addEventListener('mousedown', this.sliderOnMouseDown)
    return sliderEl
  }

  private sliderOnMouseDown(ev: MouseEvent): void {
    const body = document.body, 
      cell = (ev.target as HTMLElement).parentElement,
      left = cell?.getBoundingClientRect().left

    if (cell == null || left == null) return
    const mmHandler = (mmEv: MouseEvent): void => {
      cell.style.width = `${mmEv.clientX - left}px`
    }
    const muHandler = (): void => {
        body.removeEventListener('mousemove', mmHandler)
        body.removeEventListener('mouseup', muHandler)
      }
    
    body.addEventListener('mousemove', mmHandler)      
    body.addEventListener('mouseup', muHandler)
  }
}