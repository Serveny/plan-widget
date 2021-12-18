import { IDataTableColumn, IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
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
      const cell = this.getRowCellByOrder(row, order)
      if (cell != null) cells.push(cell)
    })
    return cells
  }

  private getRowCellByOrder(
    row: DtBodyRow, order: number): DtBodyCell | null | undefined {
    return [...row.cells.values()].find(c => c.order === order)
  }

  sortRowsByLayout(): void {
    const sortInfo = this._layout?.columns?.filter(col =>
      col.sortOrder != null)
    if (sortInfo != null) this.sortRows(sortInfo)
  }

  private sortRows(sortInfo: IDataTableColumn[]): void {
    sortInfo.sort((a, b) => this.compareSortIndex(a, b))
    const collator = this.getCollator()
    sortInfo.forEach(col => this._rows.sort((a, b) => 
      this.compareRowsByCol(a, b, col, collator)))
    this._rows.forEach((row, i) => row.order = i)
  }

  private getCollator(): Intl.Collator {
    return new Intl.Collator(this._locale, {
      numeric: true, sensitivity: 'base',
    })
  }

  private compareSortIndex(
    a: IDataTableColumn, b: IDataTableColumn): number {
    return a.sortIndex != null && b.sortIndex != null
      ? a.sortIndex + b.sortIndex : 0
  }

  private compareRowsByCol(a: DtBodyRow, b: DtBodyRow, 
    col: IDataTableColumn, collator: Intl.Collator): number {
    const aDt = (a.data as IUpdateView)[col.dataField ?? ''] as string
    const bDt = (b.data as IUpdateView)[col.dataField ?? ''] as string
    return col.sortOrder === 'desc'? collator.compare(bDt, aDt)
      : collator.compare(aDt, bDt)
  }
}