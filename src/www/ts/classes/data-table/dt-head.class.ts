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

  private sliderOnMouseDown(): void {
    console.log('onmousedown')
    document.body.style.cursor = 'ew-resize'
    window.addEventListener('mousemove', this.sliderOnMouseMove)
    window.addEventListener('mouseup', this.sliderOnMouseUp)
  }

  private sliderOnMouseMove(ev: MouseEvent): void {
    console.log('onmousemove', ev)
  }

  private sliderOnMouseUp(): void {
    console.log('onmouseup')
    document.body.style.cursor = 'auto'
    window.removeEventListener('mousemove', this.sliderOnMouseMove)
    window.removeEventListener('mouseup', this.sliderOnMouseUp)
  }
}