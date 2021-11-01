import Hlp from '../helper.class'
import { IDataTableColumn, IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import { DtHead } from './dt-head.class'
import { IView } from '../../interfaces/i-view.interface'
import { HorizontalTextAlign } from '../../enums/horizontal-text-align.enum'

export class DataTable {
  readonly el: HTMLDivElement
  private readonly head: DtHead
  private readonly bodyEl: HTMLDivElement

  private _layout: IDataTableLayout = {}
  get layout(): IDataTableLayout | null { return this._layout }

  constructor(layout: IDataTableLayout | null | undefined) {
    this.el = Hlp.createDiv('data-table', 'dt-scroll-container')
    const tableEl = Hlp.createDiv('dt-table')
    this.head = new DtHead(layout)
    this.bodyEl = Hlp.createDiv('dt-body')

    tableEl.append(this.head.el)
    tableEl.append(this.bodyEl)
    this.el.append(tableEl)

    if (layout != null) this.setLayout(layout)
  }

  appendTo(containerEl: HTMLElement): DataTable {
    containerEl.appendChild(this.el)
    return this
  }

  setLayout(layout: IDataTableLayout | null | undefined): void {
    this._layout = layout ?? {}
    this.head.fill(layout)
  }

  setTitle(title: string): void {
    this._layout.title = title
    if (Hlp.isArrNullOrEmpty(this._layout.columns))
      this.head.fill(this._layout)
  }

  addRows<TView extends IView>(rows: TView[]): void {
    rows.forEach((row, i) => this.bodyEl.appendChild(
      this.createRow(row, i)))
  }

  createRow<TView extends IView>(row: TView, order: number): HTMLDivElement {
    const rowEl = Hlp.createDiv('dt-row'),
      rowMap = new Map<string, unknown>(Object.entries(row))
    rowEl.style.order = order.toString()
    this._layout.columns?.forEach(col => {
      if (col.visible) rowEl.appendChild(
        this.createCell(rowMap, col))
    })
    return rowEl
  }

  private createCell(rowMap: Map<string, unknown>,
    col: IDataTableColumn): HTMLDivElement {
    const cell = Hlp.createDiv('dt-row-cell')
    if (col.dataField != null)
      cell.textContent = rowMap.get(col.dataField) as string
    cell.style.order = col.visibleIndex.toString()
    cell.style.width = col.width ?? 'auto'
    if (col.textAlign != null)
      cell.style.textAlign = HorizontalTextAlign[col.textAlign]
    return cell
  }
}