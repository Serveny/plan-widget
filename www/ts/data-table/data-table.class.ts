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
  private readonly _containerEl: HTMLDivElement;
  get containerEl(): HTMLDivElement { return this._containerEl; }
  private readonly tHeadEl: HTMLDivElement;
  private readonly tBodyEl: HTMLDivElement;
  private layout: IDataTableLayout | null = null;

  constructor(tableName: string) {
    this._containerEl = document.createElement('div');
    this._containerEl.classList.add('dt-scroll-container');
    const tableEl = document.createElement('div');
    this.tHeadEl = document.createElement('div');
    this.tHeadEl.textContent = tableName;
    this.tHeadEl.classList.add('dt-head');
    this.tBodyEl = document.createElement('div');

    tableEl.appendChild(this.tHeadEl);
    tableEl.appendChild(this.tBodyEl);
    this._containerEl.appendChild(tableEl);
  }

  appendTo(containerEl: HTMLElement): DataTable {
    containerEl.appendChild(this._containerEl);
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
      this.tHeadEl.appendChild(this.createHeadCell(col)));
  }

  private createHeadCell(column: IDataTableColumn): HTMLElement {
    const th = document.createElement('div');
    th.classList.add('dt-cell');
    th.textContent = column.caption ?? `(${column.dataFieldName})`;
    th.title = column.caption ?? `(${column.dataFieldName})`;

    return th;
  }

  private createRow(rowData: any): HTMLElement {
    const row = document.createElement('div');
    row.classList.add('dt-row');

    if (this.layout != null) {
      this.layout?.columns.forEach(col =>
        row.appendChild(this.createLayoutCell(rowData, col)));
    } else {
      for (const prop in rowData)
        row.appendChild(this.createCell(rowData[prop]));
    }

    return row;
  }

  private createLayoutCell(rowData: any, column: IDataTableColumn): HTMLElement {
    return this.createCell(rowData[column.dataFieldName]);
  }

  private createCell(cellText: string): HTMLElement {
    const cell = document.createElement('div');
    cell.classList.add('dt-cell');
    cell.textContent = cellText;
    return cell;
  }
}
