import Helper from './helper.class'
import { IDataTableColumn, IDataTableLayout } from '../interfaces/i-data-table-layout.interface'

export class DataTable {
  readonly el: HTMLDivElement;
  private readonly headEl: HTMLDivElement;
  private readonly bodyEl: HTMLDivElement;

  private _layout: IDataTableLayout = {};
  get layout(): IDataTableLayout | null { return this._layout }

  constructor(layout: IDataTableLayout | null | undefined) {
    this.el = Helper.createDiv('data-table', 'dt-scroll-container')
    const tableEl = Helper.createDiv('dt-table')
    this.headEl = Helper.createDiv('dt-head')
    this.bodyEl = Helper.createDiv('dt-body')

    tableEl.append(this.headEl)
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
    this.fillHead()
  }

  setTitle(title: string): void {
    this._layout.title = title
    if (Helper.isArrNullOrEmpty(this._layout.columns)) 
      this.headEl.innerHTML = title
  }

  private fillHead(): void {
    const cols = this._layout.columns
    this.headEl.innerHTML = Helper.isArrNullOrEmpty(cols)
      ? '' : (this._layout.title ?? '')
    cols?.filter(col => col.visible === true).forEach(col =>
      this.headEl.appendChild(this.createHeadCell(col)))
  }

  private createHeadCell(col: IDataTableColumn): HTMLElement {
    const th = Helper.createDiv('dt-cell', 'dt-head-cell')
    th.textContent = col.caption ?? `(${col.dataField})`
    th.title = col.caption ?? `(${col.dataField})`
    th.style.width = col.width == null ? 'auto' : col.width
    return th
  }
}