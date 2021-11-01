import { ActivityType } from '../enums/activity-type.enum'
import { LinkRealtionType } from '../enums/link-relation-type.enum'
import { RowDesign } from '../enums/row-design.enum'
import { TimeType } from '../enums/time-type.enum'

export interface IView {
  ID: string;
}

export interface IResourceView extends IView {
  Name?: string;
  CalendarID?: string;
  CapacityCurveID?: string;
  LoadCurveID?: string;
  ParentID?: string;
  PM_CollapseState: number;
  PM_CollapsedRowDesign?: RowDesign;
  PM_TableColor?: string;
  PM_TableTextColor?: string;
  PM_RowSymbolIDs?: string[];
  [x: string]: unknown;
}

export interface ICalendarView extends IView {
  Name?: string;
  Entries: ICalendarEntry[];
}

export interface ICalendarEntry {
  Start?: Date | string;
  End?: Date | string;
  TimeType?: TimeType;
}

export interface IActivityView extends IView {
  Name?: string;
  Start?: Date | string;
  End?: Date | string;
  ParentID?: string | null;
  Progress?: number;
  PM_ProgressColor?: string;
  PM_ProgressNonworkingTimeColor?: string;
  PM_Color?: string;
  PM_BorderColor?: string;
  PM_TextColor?: string;
  ActivityType?: ActivityType | number;
  CanMove?: boolean;
  CanResize?: boolean;
  CalendarID?: string;
  CollapseBehavior?: number;
  PM_Status2Visible?: boolean;
  PM_Status2Color?: string;
  PM_Status3Visible?: boolean;
  PM_Status3Color?: string;
  PM_TopLeftBarSymbolID?: string;
  PM_TopRightBarSymbolID?: string;
  PM_RowSymbolIDs?: string[];
  PM_NonworkingTimeColor?: string;
}

export interface IAllocationView extends IView {
  Name?: string;
  ActivityID: string;
  ResourceID?: string;
  TerminRuestEnde?: Date;
  CanMove?: boolean;
  CanResize?: boolean;
  PM_Status2Visible?: boolean;
  PM_Status2Color?: string;
  PM_Status3Visible?: boolean;
  PM_Status3Color?: string;
  PM_TopLeftBarSymbolID?: string;
  PM_TopRightBarSymbolID?: string;
  Entries?: IAllocationEntry[];
}

export interface IAllocationEntry {
  Start?: Date | string;
  End?: Date | string;
  Custom_Color?: string | null | undefined;
}

export interface ILinkView extends IView {
  Name?: string;
  Description?: string;
  SourceActivityID: string;
  TargetActivityID: string;
  RelationType?: LinkRealtionType;
  PM_Color?: string;
  [x: string]: unknown;
}

export interface IEntityView extends IView {
  Name?: string;
  ParentID?: string;
  PM_RowSymbolIDs?: string[];
  PM_TooltipText?: string;
  [x: string]: unknown; 
}

export interface ISymbol {
  ID?: string;
  URL?: string;
}

export interface ICurveView extends IView {
    Type?: number;
    PM_FillColor?: string;
    PM_StrokeColor?: string;
    PM_OverloadColor?: string;
    CurvePointEntries?: ICurvePointEntry[];
 }

 export interface ICurvePointEntry {
    PointInTime: Date | string;
    Value: number;
 }