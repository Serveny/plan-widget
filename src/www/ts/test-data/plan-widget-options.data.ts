import { IPlanWidgetOptions } from '../interfaces/i-plan-widget-options.interface'
import ResourceTestLayout from './resource-table-layout.data'
import EntityTestLayout from './entity-table-layout.data'

const options: IPlanWidgetOptions = {
  locale: 'en',
  start: new Date(),
  end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  resourceTableOptions: ResourceTestLayout,
  entityTableOptions: EntityTestLayout,
}

export default options