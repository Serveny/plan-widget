import('../../../pkg').catch(console.error)
import { PlanWidget } from './classes/plan-widget.class'
import { DataType } from './enums/data-type.enum'
//import { demoData } from './demo-data';

document.addEventListener("DOMContentLoaded", () => {
  const widget = new PlanWidget(document.getElementById('planWidgetContainer'), {
    locale: 'en',
    resourceTableOptions: {
      isEnabled: true,
      width: '200px',
      columns: [
        {
          visible: true,
          visibleIndex: 1,
          caption: 'Number',
          dataField: 'Nr',
          dataType: DataType.String,
          width: '100px',
        },
        {
          visible: true,
          visibleIndex: 2,
          caption: 'Name',
          dataField: 'Name',
          dataType: DataType.String,
          width: '100px',
        }
      ]
    },
  })
  // widget.addResources(demoData.Resources);
  // widget.addEntities(demoData.Entities);
  
  console.log('widget', widget)
})