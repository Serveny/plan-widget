import { IDataTableColumn, IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import Hlp from '../helper.class'
import { DtHeadCell } from './dt-head-cell.class'
import { DtService } from './dt-service.class'

export class DtHead {
  private readonly _el: HTMLDivElement
  get el(): HTMLDivElement { return this._el }
  readonly cells: DtHeadCell[] = []

  constructor(private readonly dts: DtService) {
    this._el = Hlp.createDiv('dt-head')
    this.fill(this.dts.layout)
  }

  fill(layout: IDataTableLayout | null | undefined): void {
    const cols = layout?.columns
    this._el.innerHTML = Hlp.isArrNullOrEmpty(cols)
      ? (layout?.title ?? '') : ''
    cols?.filter(col => col.visible === true).forEach(col =>
      this.addHeadCell(col))
  }

  private addHeadCell(col: IDataTableColumn): void {
    const cell = new DtHeadCell(col, this.dts)
    cell.order = col.visibleIndex
    this.cells.push(cell)
    this._el.appendChild(cell.el)
  }
}