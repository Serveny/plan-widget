import('../../pkg').catch(console.error);
import { PlanWidget } from './plan-widget';

(() => {
  const widget = new PlanWidget(document.getElementById('planWidgetContainer'));
})