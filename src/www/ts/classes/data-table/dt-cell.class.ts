import { IDataTableColumn } from '../../interfaces/i-data-table-layout.interface'
import Hlp from '../helper.class'

export abstract class DtCell {
  readonly el = Hlp.createDiv('dt-cell')
  readonly dataField: string | null | undefined
  private _order: number
  get order(): number { return this._order }
  set order(value: number) {
    this._order = value
    this.el.style.order = value.toString()
  }

  constructor(col: IDataTableColumn) {
    this._order = col.visibleIndex
    this.dataField = col.dataField
    this.el.style.order = col.visibleIndex.toString()
    this.el.style.width = col.width ?? 'auto'
  }
}