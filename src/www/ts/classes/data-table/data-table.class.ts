import Helper from '../helper.class'
import { IDataTableLayout } from '../../interfaces/i-data-table-layout.interface'
import { DtHead } from './dt-head.class'

export class DataTable {
  readonly el: HTMLDivElement;
  private readonly head: DtHead;
  private readonly bodyEl: HTMLDivElement;

  private _layout: IDataTableLayout = {};
  get layout(): IDataTableLayout | null { return this._layout }

  constructor(layout: IDataTableLayout | null | undefined) {
    this.el = Helper.createDiv('data-table', 'dt-scroll-container')
    const tableEl = Helper.createDiv('dt-table')
    this.head = new DtHead(layout)
    this.bodyEl = Helper.createDiv('dt-body')

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
    if (Helper.isArrNullOrEmpty(this._layout.columns)) 
    this.head.fill(this._layout)
  }
}