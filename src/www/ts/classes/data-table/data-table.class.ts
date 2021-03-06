import { IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import { IUpdateView, IView } from '../../interfaces/i-view.interface'
import { ScrollBarX } from '../scroll-bar/scroll-bar-x.class'
import { ScrollBarY } from '../scroll-bar/scroll-bar-y.class'
import { DtBodyRow } from './dt-body-row.class'
import { DtService } from './dt-service.class'
import Hlp from '../helper.class'

export class DataTable<TView extends IView> {
  private readonly dts: DtService
  get el(): HTMLDivElement {
    return this.dts.el
  }
  get bodyEl(): HTMLDivElement {
    return this.dts.bodyEl
  }
  private scrollBarX: ScrollBarX | null = null
  private scrollBarY: ScrollBarY | null = null

  constructor(
    id: string,
    layout: IDataTableLayout | null | undefined,
    locale: string | null | undefined,
    isScrollBarX: boolean,
    isScrollBarY: boolean
  ) {
    this.dts = new DtService(id, layout ?? {}, locale ?? 'en')
    if (isScrollBarX)
      this.scrollBarX = new ScrollBarX(
        isScrollBarY ? [5, 28] : [5, 5],
        false
      )
    if (isScrollBarY)
      this.scrollBarY = new ScrollBarY(
        isScrollBarX ? [65, 28] : [65, 5],
        false
      )
  }

  appendTo(containerEl: HTMLElement): DataTable<TView> {
    containerEl.appendChild(this.dts.el)
    this.scrollBarX
      ?.appendTo(containerEl)
      .bindBarSizeToScrollEls(this.dts.el, this.dts.bodyEl)
    this.scrollBarY
      ?.appendTo(containerEl)
      .bindBarSizeToScrollEls(this.dts.el, this.dts.bodyEl)
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

  addRows(rows: TView[]): void {
    rows.forEach(rowData => this.addRow(rowData))
    this.dts.sortRowsByLayout()
  }

  private addRow(rowData: TView): void {
    const dtRow = new DtBodyRow(
      this.dts.rows.length,
      rowData,
      this.dts.layout
    )
    this.dts.rows.push(dtRow)
    this.dts.bodyEl.appendChild(dtRow.el)
  }

  updateRows(rows: IUpdateView[]): void {
    rows.forEach(rowData => this.updateRow(rowData))
    this.dts.sortRowsByLayout()
  }

  private updateRow(rowData: IUpdateView): void {
    const rowObj = this.dts.rows.find(
      rowObj => rowObj.data.ID === rowData.ID
    )
    if (rowObj != null) rowObj.updateCells(rowData)
  }

  removeRows(rowIds: string[]): void {
    rowIds.forEach(rowId => this.removeRow(rowId))
  }

  private removeRow(rowId: string): void {
    const i = this.dts.rows.findIndex(row => row.data.ID === rowId)
    this.dts.rows[i].el.remove()
    this.dts.rows.splice(i, 1)
  }
}
