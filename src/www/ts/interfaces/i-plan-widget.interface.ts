import { IEntityView, IResourceView} from './i-view.interface'

export interface IPlanWidget {
  // fitTimeAreaIntoView: () => void;
  // scrollToDate: (date: Date) => void;
  // removeEntities: (entities: IEntityView[] | string[]) => void;
  addEntities: (entities: IEntityView[]) => void;
  // render: () => void;
  // option: (option: string, value: any) => void;
  // updateAllocations: (allocations: IAllocationView[]) => void;
  // updateResources: (resources: IResourceView[]) => void;
  // scrollToObject: (objectType: number, object: IAllocationView | IActivityView) => void;
  // updateLinks: (links: ILinkView[]) => void;
  // removeLinks: (links: ILinkView[] | string[]) => void;
  // addLinks: (links: ILinkView[]) => void;
  // removeAll: () => void;
  // addSymbols: (symbols: ISymbol[]) => void;
  addResources: (resources: IResourceView[]) => void;
  // removeResources: (resources: IResourceView[] | string[]) => void;
  // removeCalendars: (calendars: ICalendarView[] | string[]) => void;
  // addCalendars: (calendars: ICalendarView[]) => void;
  // updateCalendars: (calendars: ICalendarView[]) => void;
  // removeActivities: (activities: IActivityView[] | string[]) => void;
  // addActivities: (activities: IActivityView[]) => void;
  // updateActivities: (activities: IActivityView[]) => void;
  // removeAllocations: (allocations: IAllocationView[] | string[]) => void;
  // addAllocations: (allocations: IAllocationView[]) => void;
}