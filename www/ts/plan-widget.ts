import { DataTable } from './data-table/data-table.class';

export class PlanWidget {
  resourceTable: DataTable;

  constructor(containerEl: HTMLElement | null) {
    if (containerEl == null) throw '[PlanWidget] containerEl is null';
    this.resourceTable = new DataTable().appendTo(containerEl);
  }
}