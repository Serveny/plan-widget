import { DataTable } from './data-table.class';
import { GridSlider } from './grid-slider.class';
import { IPlanWidget } from '../interfaces/i-plan-widget.interface';
import { TimeScaler } from './time-scaler.class';
import { CacheService } from '../services/cache.service';

export class PlanWidget implements IPlanWidget {
  private readonly gridSlider: GridSlider;
  private readonly resourceTable: DataTable;
  private readonly entityTable: DataTable;
  private readonly timeScaler: TimeScaler;
  private readonly cache: CacheService;
  
  constructor(containerEl: HTMLElement | null) {
    if (containerEl == null) throw '[PlanWidget] containerEl is null';
    const startDate = new Date();
    this.cache = new CacheService(startDate, this.addSeconds(startDate, 20));
    this.gridSlider = new GridSlider(containerEl);
    this.resourceTable = new DataTable('Resource Table');
    this.entityTable = new DataTable('Entity Table');
    this.timeScaler = new TimeScaler(this.cache);

    this.gridSlider.fieldLeft.appendChild(this.resourceTable.el);
    this.gridSlider.fieldMiddle.appendChild(this.timeScaler.el);
    this.gridSlider.fieldRight.appendChild(this.entityTable.el);

    this.timeScaler.paint();
  }

  addResources(resources: any[]): void {
    this.resourceTable.addRows(resources);
  }

  addEntities(resources: any[]): void {
    this.entityTable.addRows(resources);
  }

  // private addMonths(dateIn: Date, months: number): Date {
  //   const d = dateIn.getDate();
  //   const dateOut = new Date();
  //   dateOut.setMonth(dateIn.getMonth() + +months);
  //   if (dateIn.getDate() != d) dateOut.setDate(0);
  //   return dateOut;
  // }

  private addSeconds(dateIn: Date, months: number): Date {
    const d = dateIn.getDate();
    const dateOut = new Date();
    dateOut.setSeconds(dateIn.getSeconds() + +months);
    if (dateIn.getDate() != d) dateOut.setDate(0);
    return dateOut;
  }
}