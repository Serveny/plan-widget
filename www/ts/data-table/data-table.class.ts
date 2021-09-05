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
  private readonly table: HTMLTableElement;
  private readonly tHeadRow: HTMLElement;
  private readonly tBody: HTMLElement;
  private layout: IDataTableLayout | null = null;

  constructor() {
    this.table = document.createElement('table');
    const tHead = document.createElement('thead');
    this.tHeadRow = document.createElement('tr');
    this.tBody = document.createElement('tbody');
    
    tHead.appendChild(this.tHeadRow);
    this.table.appendChild(tHead);
    this.table.appendChild(this.tBody);
  }

  appendTo(containerEl: HTMLElement): DataTable {
    console.log(containerEl, this.table);
    containerEl.appendChild(this.table);
    return this;
  }

  setLayout(layout: IDataTableLayout): void {
    this.layout = layout;
    this.fillHead(layout.columns);
  }

  addRows(rows: any[]): void {
    rows.forEach(row => 
      this.tBody.appendChild(this.createRow(row)));
  }

  updateRows(): void {
    
  }

  deleteRows(): void {

  }

  private fillHead(columns: Map<string, IDataTableColumn>): void {
    columns.forEach(col => 
      this.tHeadRow.appendChild(this.createHeadColumn(col)));
  }

  private createHeadColumn(column: IDataTableColumn): HTMLElement {
    const th = document.createElement('th');
    th.textContent = column.caption ?? `(${column.dataFieldName})`;
    th.title = column.caption ?? `(${column.dataFieldName})`;

    return th;
  }

  private createRow(rowData: any): HTMLElement {
    const row = document.createElement('tr');
    this.layout?.columns.forEach(col => this.createCell(rowData, col))
    return row;
  }

  private createCell(rowData: any, column: IDataTableColumn): HTMLElement {
    const cell = document.createElement('td');
    cell.textContent = rowData[column.dataFieldName];
    return cell;
  }
}
