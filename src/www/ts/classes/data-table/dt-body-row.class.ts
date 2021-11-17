import { IDataTableColumn, IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import { IUpdateView, IView } from '../../interfaces/i-view.interface'
import Hlp from '../helper.class'
import { DtBodyCell } from './dt-body-cell.class'

export class DtBodyRow {
  readonly el = Hlp.createDiv('dt-row')
  readonly cells = new Map<string, DtBodyCell>()
  get order(): number { return this._order }
  set order(value: number) {
    this._order = value
    this.el.style.order = value.toString()
  }
  get data(): IView { return this._data }

  constructor(private _order: number, private _data: IView,
    private _layout: IDataTableLayout | null | undefined) {
    this.el.style.order = this._order.toString()
    this.addCells()
  }

  updateCells(rowData: IUpdateView): void {
    Object.entries(rowData).forEach(df => {
      const cell = this.cells.get(df[0])
      if(cell != null && df[1] != null) cell.text = df[1] as string
    })
  }

  private addCells(): void {
    const rowMap = Hlp.objToMap(this._data)
    this._layout?.columns?.forEach(col => {
      if (col.visible) this.addCell(rowMap, col)
    })
  }

  private addCell(rowMap: Map<string, unknown>, col: IDataTableColumn): void {
    if (col.dataField != null) {
      const text = rowMap.get(col.dataField) as string,
      cell = new DtBodyCell(text, col)
      this.cells.set(col.dataField, cell)
      this.el.appendChild(cell.el)
    }
  }
}