import { IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import { IUpdateView } from '../../interfaces/i-view.interface'
import Hlp from '../helper.class'
import { DtBodyCell } from './dt-body-cell.class'
import { DtBodyRow } from './dt-body-row.class'
import { DtHead } from './dt-head.class'

export class DtService {
  readonly el = Hlp.createDiv('data-table', 'dt-scroll-container')
  readonly head = new DtHead(this)
  readonly bodyEl = Hlp.createDiv('dt-body')

  get layout(): IDataTableLayout { return this._layout }

  private _rows: DtBodyRow[] = []
  get rows(): DtBodyRow[] { return this._rows }

  constructor(id: string, private _layout: IDataTableLayout, 
    private _locale: string) {
    this.el.classList.add(id)
    const tableEl = Hlp.createDiv('dt-table')

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
      if (cell != null) cells.push(cell)
    })
    return cells
  }

  sortRowsByLayout(): void {
    const sortInfo = this._layout?.columns?.filter(col =>
      col.sortOrder != null)

    if (sortInfo != null) {
      sortInfo.sort((a, b) => a.sortIndex != null && b.sortIndex != null
        ? a.sortIndex + b.sortIndex : 0)
      const collator = new Intl.Collator(this._locale, {
        numeric: true, sensitivity: 'base', 
      })
      sortInfo.forEach(col => this._rows.sort((a, b) => {
        const aData = (a.data as IUpdateView)[col.dataField ?? ''] as string,
          bData = (b.data as IUpdateView)[col.dataField ?? ''] as string
        return col.sortOrder === 'desc' ? collator.compare(bData, aData)
         : collator.compare(aData, bData)
      }))
      this._rows.forEach((row, i) => row.order = i)
    }
  }
}