import { IDataTableColumn, IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import Hlp from '../helper.class'
import { DtHeadMoveCell } from './dt-head-move-cell.class'

export class DtHead {
  private readonly _el: HTMLElement
  get el(): HTMLElement { return this._el }

  constructor(private layout: IDataTableLayout | null | undefined, 
    private dtBodyEl: HTMLElement) {
    this._el = Hlp.createDiv('dt-head')
    this.fill(layout)
  }

  fill(layout: IDataTableLayout | null | undefined): void {
    const cols = layout?.columns
    this._el.innerHTML = Hlp.isArrNullOrEmpty(cols)
      ? (layout?.title ?? '') : ''
    cols?.filter(col => col.visible === true).forEach(col =>
      this._el.appendChild(this.createHeadCell(col)))
    this.layout = layout
  }

  private createHeadCell(col: IDataTableColumn): HTMLElement {
    const el = Hlp.createDiv('dt-cell', 'dt-head-cell')
    el.style.order = col.visibleIndex.toString()
    el.appendChild(this.createTextEl(
      col.caption ?? `(${col.dataField})`))
    el.appendChild(this.createCellSlider())
    el.style.width = col.width == null ? 'auto' : col.width
    el.appendChild(this.createSortMark(col.sortOrder, col.sortIndex))
    return el
  }

  private createTextEl(text: string): HTMLElement {
    const textEl = Hlp.createDiv('dt-head-cell-text')
    textEl.textContent = text
    textEl.title = text
    textEl.addEventListener('mousedown', ev => {
      if (textEl.parentElement != null)
        new DtHeadMoveCell(ev, textEl.parentElement, 
          this._el, this.dtBodyEl, this.layout)
    })
    return textEl
  }

  private createSortMark(sortOrder: string | null | undefined, 
    sortIndex: number | null | undefined): SVGElement {
    const el = Hlp.createSvg('svg'), 
      pl = Hlp.createSvg('polyline'), 
      ln = Hlp.createSvg('line'),
      soTxt = Hlp.createSvg('text')
    el.classList.add('dt-head-sort-mark')
    el.setAttribute('width', '512')
    el.setAttribute('height', '512')
    el.setAttribute('viewBox', '0 0 512 512')
    pl.classList.add('dt-head-sort-svg-line')
    pl.setAttribute('points', '112 244 256 100 400 244')
    ln.classList.add('dt-head-sort-svg-line')
    ln.setAttribute('x1', '256')
    ln.setAttribute('y1', '120')
    ln.setAttribute('x2', '256')
    ln.setAttribute('y2', '412')
    soTxt.classList.add('dt-head-sort-svg-order-text')
    soTxt.setAttribute('x', '400')
    soTxt.setAttribute('y', '400')
    if (sortIndex != null) soTxt.append(sortIndex.toString())
    if (sortOrder === 'desc') el.setAttribute('transform', 'rotate(180 0 0)')
    el.setAttribute('opacity', '0.6')
    el.append(pl, ln, soTxt)
    return el
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
      rowCells = Hlp.getChildrenByOrder(this.dtBodyEl, 
        '.dt-row-cell', parseInt(cell?.style.order ?? '0'))

    if (cell != null && left != null) {
      this._el.style.cursor = 'col-resize'
      const mmHandler = (mmEv: MouseEvent): void => {
        const newVal = mmEv.clientX - left
        if (newVal > 0) {
          const widthStr = `${newVal}px`
          cell.style.width = widthStr
          rowCells.forEach(rc => rc.style.width = widthStr)
        }
      }
      const muHandler = (): void => {
        this._el.style.cursor = ''
        window.removeEventListener('mousemove', mmHandler)
        window.removeEventListener('mouseup', muHandler)
        this.refreshLayoutColWidth(parseInt(cell.style.order), cell.style.width)
      }
      window.addEventListener('mousemove', mmHandler)
      window.addEventListener('mouseup', muHandler)
    }
  }

  private refreshLayoutColWidth(order: number, width: string): void {
    const col =  this.layout?.columns?.find(col => 
      col.visibleIndex === order)
    if (col != null) col.width = width
  }
}