import('../../pkg').catch(console.error);
import { PlanWidget } from './classes/plan-widget.class';
import { demoData } from './demo-data';

document.addEventListener("DOMContentLoaded", () => {
  const widget = new PlanWidget(document.getElementById('planWidgetContainer'));
  widget.addResources(demoData.Resources);
  widget.addEntities(demoData.Entities);
  
  console.log('widget', widget);
});