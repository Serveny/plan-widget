import { PlanWidget } from './classes/plan-widget.class'
import TestOptions from './test-data/plan-widget-options.data'
import { DemoData } from './demo-data'
import { IResourceView } from './interfaces/i-view.interface'

function createResources(count: number): IResourceView[] {
  const resources: IResourceView[] = []
  for (let i = 0; i < count; i++) resources.push({
    ID: `R${i}`,
    Name: `Resource ${i}`,
    CalendarID: `Cal${i}`,
    CapacityCurveID: `Cap${i}`,
    LoadCurveID: `L${i}`,
    PM_CollapseState: -1,
    Amount: Math.floor(Math.random() * 1000),
  })
  return resources
} 

function init(): void {
  const start = Date.now(), widget = new PlanWidget(
    document.getElementById('planWidgetContainer'),
    TestOptions), dd = new DemoData()
  widget.addResources(createResources(100))
  widget.addEntities(dd.Entities)
  console.log(`Time: ${Date.now() - start}ms`)
}

if (document.readyState !== 'loading') init()
else document.addEventListener('DOMContentLoaded', init)
