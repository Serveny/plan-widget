import { IPlanWidgetOptions } from '../interfaces/i-plan-widget-options.interface'
import ResourceTestLayout from './resource-table-layout.data'
import EntityTestLayout from './entity-table-layout.data'
import NextDate from '../classes/date-helper/next-date.class'
import FloorDate from '../classes/date-helper/floor-date.class'

const options: IPlanWidgetOptions = {
  locale: 'en',
  start: FloorDate.floorToYear(new Date()),
  end: NextDate.nextYear(new Date()),
  resourceTableOptions: ResourceTestLayout,
  entityTableOptions: EntityTestLayout,
}

export default options
