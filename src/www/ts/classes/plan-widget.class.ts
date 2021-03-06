import { GridSlider } from './grid-slider.class'
//import { IPlanWidget } from '../interfaces/i-plan-widget.interface';
import { TimeScaler } from './time-scaler/time-scaler.class'
import { CacheService } from './services/cache.service'
import {
  IEntityView,
  IResourceView,
} from '../interfaces/i-view.interface'
import { DataTable } from './data-table/data-table.class'
import { IPlanWidgetOptions } from '../interfaces/i-plan-widget-options.interface'
import { ScrollBarX } from './scroll-bar/scroll-bar-x.class'
import Hlp from './helper.class'
import { ScrollBarY } from './scroll-bar/scroll-bar-y.class'
//import * as wasm from 'plan-widget-wasm'

export class PlanWidget /*implements IPlanWidget*/ {
  private readonly cache: CacheService
  private readonly gridSlider: GridSlider
  private readonly resourceTable: DataTable<IResourceView>
  private readonly entityTable: DataTable<IEntityView>
  private readonly timeScaler: TimeScaler
  private readonly scrollBarX: ScrollBarX
  private readonly scrollBarY: ScrollBarY
  //private readonly wasm = wasm

  constructor(
    containerEl: HTMLElement | null | undefined,
    options: IPlanWidgetOptions
  ) {
    if (containerEl == null) throw '[PlanWidget] containerEl is null'
    const startDate = options.start ?? new Date(),
      endDate = options.end ?? new Date(new Date().setDate(+7))
    if (startDate.getTime() > endDate.getTime())
      throw '[PlanWidget] Start date cannot be bigger than end date'
    this.cache = new CacheService(startDate, endDate)
    this.gridSlider = new GridSlider(containerEl)
    this.resourceTable = new DataTable(
      'plw-resource-table',
      options.resourceTableOptions,
      options.locale,
      true,
      false
    )
    this.entityTable = new DataTable(
      'plw-entity-table',
      options.entityTableOptions,
      options.locale,
      true,
      true
    )
    this.timeScaler = new TimeScaler(this.cache)
    this.scrollBarX = new ScrollBarX([5, 30], true)
    this.scrollBarY = new ScrollBarY([65, 30], false)

    this.resourceTable.appendTo(this.gridSlider.fieldL)
    const conMiddle = Hlp.createDiv('dt-scroll-container')
    this.gridSlider.fieldM.appendChild(conMiddle)
    this.timeScaler.appendTo(conMiddle)
    this.scrollBarX.appendTo(conMiddle).addResizeObserver()
    this.scrollBarY
      .appendTo(conMiddle)
      .bindBarSizeToScrollEls(
        this.resourceTable.el,
        this.resourceTable.bodyEl
      )
    this.entityTable.appendTo(this.gridSlider.fieldR)
    this.addHandlers()
    // const start = new Date().getTime(),
    //   end = new Date(new Date().setFullYear(2030)).getTime()
    // console.log('wasm test1: ', this.wasm.test())
    // console.log(
    //   'wasm test2: ',
    //   this.wasm.each_year_of_interval([start, end])
    // )
    // console.log('rTime: ', new Date().getTime() - start)
    // console.log(this)
  }

  private addHandlers(): void {
    this.scrollBarX.onUserChangedPct = (
      startPct: number,
      endPct: number
    ): void => this.onChangedScollbarX(startPct, endPct)
    this.timeScaler.onChangedDate = (start: Date, end: Date): void =>
      this.onChangedTimescaler(start, end)
  }

  private onChangedScollbarX(startPct: number, endPct: number): void {
    this.cache.setFocusByPct(startPct, endPct)
    this.timeScaler.paint()
  }

  private onChangedTimescaler(start: Date, end: Date): void {
    this.cache.setFocusByDate(start, end)
    this.scrollBarX.setBarByPct(
      Hlp.dateToPct(start, this.cache.startDate, this.cache.endDate),
      Hlp.dateToPct(end, this.cache.startDate, this.cache.endDate)
    )
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
}
