import('../../pkg').catch(console.error);
import { PlanWidget } from './plan-widget';

document.addEventListener("DOMContentLoaded", () => {
  const widget = new PlanWidget(document.getElementById('planWidgetContainer'));
  console.log('widget', widget);
});