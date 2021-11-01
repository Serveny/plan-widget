import('../../../pkg').catch(console.error)
import { PlanWidget } from './classes/plan-widget.class'
import TestOptions from './test-data/plan-widget-options.data'
import { DemoData } from './demo-data'

document.addEventListener("DOMContentLoaded", () => {
  const widget = new PlanWidget(
    document.getElementById('planWidgetContainer'), 
    TestOptions), dd = new DemoData()
  widget.addResources(dd.Resources)
  // widget.addEntities(demoData.Entities);
  
  console.log('widget', widget)
})