import { IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import { DtBodyRow } from './dt-body-row.class'
import { DtHead } from './dt-head.class'
import Hlp from '../helper.class'
import { DtBodyCell } from './dt-body-cell.class'

export class DtService {
  readonly el: HTMLDivElement
  readonly head: DtHead
  readonly bodyEl: HTMLDivElement

  get layout(): IDataTableLayout { return this._layout }

  private _rows: DtBodyRow[] = []
  get rows(): DtBodyRow[] { return this._rows }
  
  constructor(private _layout: IDataTableLayout) {
    this.el = Hlp.createDiv('data-table', 'dt-scroll-container')
    const tableEl = Hlp.createDiv('dt-table')
    this.bodyEl = Hlp.createDiv('dt-body')
    this.head = new DtHead(this)

    tableEl.append(this.head.el)
    tableEl.append(this.bodyEl)
    this.el.append(tableEl)

    if (this._layout != null) this.setLayout(this._layout)
  }

  setLayout(layout: IDataTableLayout | null | undefined): void {
    this._layout = layout ?? {}
    this.head.fill(layout)
  }
  
  getBodyCellsByOrder(order: number): DtBodyCell[] {
    const cells: DtBodyCell[] = []
    this.rows.forEach(row => {
      const cell = [...row.cells.values()].find(c => c.order === order)
      if(cell != null) cells.push(cell)
    })
    return cells
  }
}