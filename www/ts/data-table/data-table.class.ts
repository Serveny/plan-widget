export interface IDataTableLayout {
  columns: Map<string, IDataTableColumn>;
  width: number | string;
}

export interface IDataTableColumn {
  dataFieldName: string;
  caption?: string;
  width?: number | string;
  index: number;
}

export class DataTable {
  private readonly _tableEl: HTMLDivElement;
  get tableEl(): HTMLDivElement { return this._tableEl; }
  private readonly tHeadRowEl: HTMLDivElement;
  private readonly tBodyEl: HTMLDivElement;
  private layout: IDataTableLayout | null = null;

  constructor() {
    this._tableEl = document.createElement('div');
    const tHeadEl = document.createElement('div');
    this.tHeadRowEl = document.createElement('div');
    this.tBodyEl = document.createElement('div');
    
    tHeadEl.appendChild(this.tHeadRowEl);
    this.tableEl.appendChild(tHeadEl);
    this.tableEl.appendChild(this.tBodyEl);
  }

  appendTo(containerEl: HTMLElement): DataTable {
    console.log(containerEl, this.tableEl);
    containerEl.appendChild(this.tableEl);
    return this;
  }

  setLayout(layout: IDataTableLayout): void {
    this.layout = layout;
    this.fillHead(layout.columns);
  }

  addRows(rows: any[]): void {
    rows.forEach(row => 
      this.tBodyEl.appendChild(this.createRow(row)));
  }

  updateRows(): void {
    
  }

  deleteRows(): void {

  }

  private fillHead(columns: Map<string, IDataTableColumn>): void {
    columns.forEach(col => 
      this.tHeadRowEl.appendChild(this.createHeadColumn(col)));
  }

  private createHeadColumn(column: IDataTableColumn): HTMLElement {
    const th = document.createElement('div');
    th.textContent = column.caption ?? `(${column.dataFieldName})`;
    th.title = column.caption ?? `(${column.dataFieldName})`;

    return th;
  }

  private createRow(rowData: any): HTMLElement {
    const row = document.createElement('div');
    this.layout?.columns.forEach(col => this.createCell(rowData, col))
    return row;
  }

  private createCell(rowData: any, column: IDataTableColumn): HTMLElement {
    const cell = document.createElement('div');
    cell.textContent = rowData[column.dataFieldName];
    return cell;
  }
}
