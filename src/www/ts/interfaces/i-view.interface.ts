import { ActivityType } from '../enums/activity-type.enum'
import { LinkRealtionType } from '../enums/link-relation-type.enum'
import { RowDesign } from '../enums/row-design.enum'
import { TimeType } from '../enums/time-type.enum'

export interface IView {
  ID: string;
}

export interface IResourceView extends IView {
  CalendarID?: string;
  CapacityCurveID?: string;
  LoadCurveID?: string;
  ParentID?: string;
  PM_CollapsedRowDesign?: RowDesign;
  PM_TableColor?: string;
  PM_TableTextColor?: string;
  PM_RowSymbolIDs?: string[];
}

export interface ICalendarView extends IView {
  Entries: ICalendarEntry[];
}

export interface ICalendarEntry {
  Start?: Date;
  End?: Date;
  TimeType?: TimeType;
}

export interface IActivityView extends IView {
  ParentID?: string;
  Progress?: number;
  PM_ProgressColor?: string;
  PM_ProgressNonworkingTimeColor?: string;
  PM_Color?: string;
  PM_BorderColor?: string;
  PM_TextColor?: string;
  ActivityType?: ActivityType;
  CanMove?: boolean;
  CanResize?: boolean;
  CalendarID?: string;
  CollapseBehavior?: number;
  PM_Status2Visible: boolean;
  PM_Status2Color?: string;
  PM_Status3Visible: boolean;
  PM_Status3Color?: string;
  PM_TopLeftBarSymbolID?: string;
  PM_TopRightBarSymbolID?: string;
  PM_RowSymbolIDs: string[];
}

export interface IAllocationView extends IView {
  Name?: string;
  ActivityID: string;
  ResourceID?: string;
  TerminRuestEnde?: Date;
  ADVARIS_CanMove?: boolean;
  ADVARIS_CanResize?: boolean;
  PM_Status2Visible: boolean;
  PM_Status2Color?: string;
  PM_Status3Visible: boolean;
  PM_Status3Color?: string;
  PM_TopLeftBarSymbolID?: string;
  PM_TopRightBarSymbolID?: string;
  Entries: IAllocationEntry[];
}

export interface IAllocationEntry {
  Start?: Date | null | undefined;
  End?: Date | null | undefined;
  Custom_Color?: string | null | undefined;
}

export interface ILinkView extends IView {
  Name?: string;
  Description?: string;
  SourceActivityID: string;
  TargetActivityID: string;
  RelationType: LinkRealtionType;
  PM_Color?: string;
}

export interface IEntityView extends IView {
  Name?: string;
  ParentID?: string;
  PM_RowSymbolIDs: string[];
}

export interface ISymbol {
  ID?: string;
  URL?: string;
}