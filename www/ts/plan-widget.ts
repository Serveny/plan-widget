import { DataTable } from './data-table/data-table.class';
import { GridSlider } from './grid-slider';

export class PlanWidget {
  private readonly gridSlider: GridSlider;
  private readonly resourceTable: DataTable;
  private readonly entityTable: DataTable;
  
  constructor(containerEl: HTMLElement | null) {
    if (containerEl == null) throw '[PlanWidget] containerEl is null';
    this.gridSlider = new GridSlider(containerEl);
    this.resourceTable = new DataTable('Resource Table');
    this.entityTable = new DataTable('Entity Table');

    this.gridSlider.appendToLeft(this.resourceTable.tableEl);
    this.gridSlider.appendToRight(this.entityTable.tableEl);
  }
}