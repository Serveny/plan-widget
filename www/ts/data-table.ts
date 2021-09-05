export class DataTable {
  tHeadRow: HTMLElement;

  constructor(containerEl: HTMLElement) {
    const table = document.createElement('table');
    const tHead = document.createElement('thead');
    table.appendChild(tHead);
    this.tHeadRow = document.createElement('tr');
    tHead.appendChild(this.tHeadRow);

    containerEl.appendChild(table);
  }
}
