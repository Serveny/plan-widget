import { DataTable } from './data-table/data-table.class';
import { GridSlider } from './grid-slider';
import { IPlanWidget } from './interfaces/i-plan-widget.interface';

export class PlanWidget implements IPlanWidget {
  private readonly gridSlider: GridSlider;
  private readonly resourceTable: DataTable;
  private readonly entityTable: DataTable;
  
  constructor(containerEl: HTMLElement | null) {
    if (containerEl == null) throw '[PlanWidget] containerEl is null';
    this.gridSlider = new GridSlider(containerEl);
    this.resourceTable = new DataTable('Resource Table');
    this.entityTable = new DataTable('Entity Table');

    this.gridSlider.appendToLeft(this.resourceTable.containerEl);
    this.gridSlider.appendToRight(this.entityTable.containerEl);
  }

  addResources(resources: any[]): void {
    this.resourceTable.addRows(resources);
  }

  addEntities(resources: any[]): void {
    this.entityTable.addRows(resources);
  }
}