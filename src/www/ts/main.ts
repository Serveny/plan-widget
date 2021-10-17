import('../../../pkg').catch(console.error)
import { PlanWidget } from './classes/plan-widget.class'
import TestOptions from './test-data/plan-widget-options.data'
//import { demoData } from './demo-data';

document.addEventListener("DOMContentLoaded", () => {
  const widget = new PlanWidget(
    document.getElementById('planWidgetContainer'), 
    TestOptions)
  // widget.addResources(demoData.Resources);
  // widget.addEntities(demoData.Entities);
  
  console.log('widget', widget)
})