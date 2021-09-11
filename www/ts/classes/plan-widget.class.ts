import { DataTable } from './data-table.class';
import { GridSlider } from './grid-slider.class';
import { IPlanWidget } from '../interfaces/i-plan-widget.interface';
import { TimeScale } from './time-scale.class';

export class PlanWidget implements IPlanWidget {
  private readonly gridSlider: GridSlider;
  private readonly resourceTable: DataTable;
  private readonly entityTable: DataTable;
  private readonly timeScale: TimeScale;
  
  constructor(containerEl: HTMLElement | null) {
    if (containerEl == null) throw '[PlanWidget] containerEl is null';
    this.gridSlider = new GridSlider(containerEl);
    this.resourceTable = new DataTable('Resource Table');
    this.entityTable = new DataTable('Entity Table');
    this.timeScale = new TimeScale();

    this.gridSlider.fieldLeft.appendChild(this.resourceTable.el);
    this.gridSlider.fieldMiddle.appendChild(this.timeScale.el);
    this.gridSlider.fieldRight.appendChild(this.entityTable.el);
  }

  addResources(resources: any[]): void {
    this.resourceTable.addRows(resources);
  }

  addEntities(resources: any[]): void {
    this.entityTable.addRows(resources);
  }
}