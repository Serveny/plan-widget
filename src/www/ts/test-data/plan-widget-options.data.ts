import { IPlanWidgetOptions } from '../interfaces/i-plan-widget-options.interface'
import ResourceTestLayout from './resource-table-layout.data'
import EntityTestLayout from './entity-table-layout.data'

const options: IPlanWidgetOptions = {
  locale: 'en',
  resourceTableOptions: ResourceTestLayout,
  entityTableOptions: EntityTestLayout,
}

export default options