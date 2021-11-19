import { GridSlider } from './grid-slider.class'
//import { IPlanWidget } from '../interfaces/i-plan-widget.interface';
import { TimeScaler } from './time-scaler.class'
import { CacheService } from '../services/cache.service'
import { IEntityView, IResourceView } from '../interfaces/i-view.interface'
import { DataTable } from './data-table/data-table.class'
import { IPlanWidgetOptions } from '../interfaces/i-plan-widget-options.interface'

export class PlanWidget /*implements IPlanWidget*/ {
  private readonly gridSlider: GridSlider
  private readonly resourceTable: DataTable<IResourceView>
  private readonly entityTable: DataTable<IEntityView>
  private readonly timeScaler: TimeScaler
  private readonly cache: CacheService
  
  constructor(containerEl: HTMLElement | null, options: IPlanWidgetOptions) {
    if (containerEl == null) throw '[PlanWidget] containerEl is null'
    const startDate = options.start ?? new Date()
    this.cache = new CacheService(startDate, this.addSeconds(startDate, 20))
    this.gridSlider = new GridSlider(containerEl)
    this.resourceTable = new DataTable('plw-resource-table', 
      options.resourceTableOptions, options.locale)
    this.entityTable = new DataTable('plw-entity-table',
      options.entityTableOptions, options.locale)
    this.timeScaler = new TimeScaler(this.cache)

    this.gridSlider.fieldLeft.appendChild(this.resourceTable.el)
    this.gridSlider.fieldMiddle.appendChild(this.timeScaler.el)
    this.gridSlider.fieldRight.appendChild(this.entityTable.el)

    this.timeScaler.paint()
  }

  addResources(resources: IResourceView[]): void { 
    this.resourceTable.addRows(resources)
  }

  addEntities(entities: IEntityView[]): void {
    this.entityTable.addRows(entities)
  }

  updateResources(resources: IResourceView[]): void {
    this.resourceTable.updateRows(resources)
  }

  updateEntities(entities: IEntityView[]): void {
    this.entityTable.updateRows(entities)
  }
  
  removeResources(resourceIds: string[]): void {
    this.resourceTable.removeRows(resourceIds)
  }

  removeEntities(entityIds: string[]): void {
    this.entityTable.removeRows(entityIds)
  }

  // private addMonths(dateIn: Date, months: number): Date {
  //   const d = dateIn.getDate();
  //   const dateOut = new Date();
  //   dateOut.setMonth(dateIn.getMonth() + +months);
  //   if (dateIn.getDate() != d) dateOut.setDate(0);
  //   return dateOut;
  // }

  private addSeconds(dateIn: Date, months: number): Date {
    const d = dateIn.getDate()
    const dateOut = new Date()
    dateOut.setSeconds(dateIn.getSeconds() + +months)
    if (dateIn.getDate() != d) dateOut.setDate(0)
    return dateOut
  }
}