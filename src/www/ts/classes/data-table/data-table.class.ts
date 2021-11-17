import { IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import { IView } from '../../interfaces/i-view.interface'
import Hlp from '../helper.class'
import { DtBodyRow } from './dt-body-row.class'
import { DtService } from './dt-service.class'

export class DataTable {
  private readonly dts: DtService
  get el(): HTMLDivElement { return this.dts.el }

  constructor(layout: IDataTableLayout | null | undefined) {
    this.dts = new DtService(layout ?? {})
  }

  appendTo(containerEl: HTMLElement): DataTable {
    containerEl.appendChild(this.dts.el)
    return this
  }

  setLayout(layout: IDataTableLayout | null | undefined): void {
    return this.dts.setLayout(layout ?? {})
  }

  setTitle(title: string): void {
    const layout = this.dts.layout
    if (layout != null) {
      layout.title = title
      if (Hlp.isArrNullOrEmpty(layout.columns))
        this.dts.head.fill(layout)
    }
  }

  addRows(rows: IView[]): void {
    rows.forEach(rowData => this.addRow(rowData))
  }

  addRow(rowData: IView): void {
    const dtRow = new DtBodyRow(this.dts.rows.length, rowData, this.dts.layout)
    this.dts.rows.push(dtRow)
    this.dts.bodyEl.appendChild(dtRow.el)
  }

  // updateRows(rows: IView[]): void {
  //   rows.forEach(rowData => this.updateRow(rowData))
  // }

  // updateRow(rowData: IView): void {
  //   const rowObj = this.rows.find(rowObj => rowObj.data.ID === rowData.ID)
  //   if (rowObj != null) rowObj.update(rowData)
  // }
}