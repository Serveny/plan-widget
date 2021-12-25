import { IDataTableColumn } from '../../interfaces/i-data-table-layout.interface'
import { DtCell } from './dt-cell.class'
import Hlp from '../helper.class'
import { DtHeadMoveCell } from './dt-head-move-cell.class'
import { DtService } from './dt-service.class'

export class DtHeadCell extends DtCell {
  constructor(col: IDataTableColumn, 
    private readonly dts: DtService) {
    super(col)
    this.el.classList.add('dt-head-cell')
    this.el.appendChild(this.createTextEl(
      col.caption ?? `(${col.dataField})`))
    this.el.appendChild(this.createCellSlider())
    this.el.style.width = col.width == null ? 'auto' : col.width
    this.el.appendChild(
      this.createSortMark(col.sortOrder, col.sortIndex))
  }

  private createTextEl(text: string): HTMLElement {
    const textEl = Hlp.createDiv('dt-head-cell-text')
    textEl.title = textEl.textContent = text
    textEl.addEventListener('mousedown', ev => {
      if (textEl.parentElement != null)
        new DtHeadMoveCell(ev, textEl.parentElement, this.dts)
    })
    return textEl
  }

  private createSortMark(sortOrder: string | null | undefined, 
    sortIndex: number | null | undefined): SVGElement {
    const el = Hlp.createSvg('svg'), 
      pl = this.createSortMarkPolyline()
    this.setSortMarkAttributes(el)
    el.append(pl, this.createSortMarkLine(), 
      this.createSortMarkIndexText(sortIndex, sortOrder))
    if (sortOrder === 'desc') 
      pl.setAttribute('transform', 'rotate(180 255 260)')
    return el
  }

  private setSortMarkAttributes(el: SVGElement): void {
    el.classList.add('dt-head-sort-mark')
    el.setAttribute('width', '512')
    el.setAttribute('height', '512')
    el.setAttribute('viewBox', '0 0 512 512')
    el.setAttribute('opacity', '0.6')
  }

  private createSortMarkPolyline(): SVGPolylineElement {
    const pl = Hlp.createSvg('polyline')
    pl.classList.add('dt-head-sort-svg-line')
    pl.setAttribute('points', '112 244 256 100 400 244')
    return pl
  }

  private createSortMarkLine(): SVGLineElement {
    const ln = Hlp.createSvg('line')
    ln.classList.add('dt-head-sort-svg-line')
    ln.setAttribute('x1', '256')
    ln.setAttribute('y1', '120')
    ln.setAttribute('x2', '256')
    ln.setAttribute('y2', '412')
    return ln
  }

  private createSortMarkIndexText(
    sortIndex: number | null | undefined, 
    sortOrder: string | null | undefined): SVGTextElement {
    const txt = Hlp.createSvg('text')
    txt.classList.add('dt-head-sort-svg-order-text')
    txt.setAttribute('x', '330')
    txt.setAttribute('y', sortOrder === 'desc' ? '250' : '500')
    txt.setAttribute('textLength', '190px')
    if (sortIndex != null) txt.append(sortIndex.toString())
    return txt
  }

  private createCellSlider(): HTMLElement {
    const sliderEl = Hlp.createDiv('dt-head-cell-slider')
    sliderEl.addEventListener('mousedown', ev =>
      this.resizeCell(ev))
    return sliderEl
  }

  private resizeCell(ev: MouseEvent): void {
    ev.preventDefault()
    const cell = (ev.target as HTMLElement).parentElement,
      left = cell?.getBoundingClientRect().left,
      rowCells = this.dts.getBodyCellsByOrder(
        parseInt(cell?.style.order ?? '0'))

    if (cell != null && left != null) {
      this.dts.head.el.style.cursor = 'col-resize'
      const mmHandler = (mmEv: MouseEvent): void => {
        const newVal = mmEv.clientX - left
        if (newVal > 0) {
          const widthStr = `${newVal}px`
          cell.style.width = widthStr
          rowCells.forEach(rc => rc.el.style.width = widthStr)
        }
      }
      const muHandler = (): void => {
        this.dts.head.el.style.cursor = ''
        window.removeEventListener('mousemove', mmHandler)
        window.removeEventListener('mouseup', muHandler)
        this.refreshLayoutColWidth(
          parseInt(cell.style.order), cell.style.width)
      }
      window.addEventListener('mousemove', mmHandler)
      window.addEventListener('mouseup', muHandler)
    }
  }

  private refreshLayoutColWidth(order: number, width: string): void {
    const col =  this.dts.layout?.columns?.find(col => 
      col.visibleIndex === order)
    if (col != null) col.width = width
  }
}