import { IPlanWidgetOptions } from '../interfaces/i-plan-widget-options.interface'
import ResourceTestLayout from './resource-table-layout.data'
import EntityTestLayout from './entity-table-layout.data'

const options: IPlanWidgetOptions = {
  locale: 'en',
  start: new Date(2022, 0, 0),
  end: new Date(new Date(2022, 0, 0)
    .setFullYear(new Date().getFullYear() + 5)),
  resourceTableOptions: ResourceTestLayout,
  entityTableOptions: EntityTestLayout,
}

export default options