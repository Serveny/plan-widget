import { IPlanWidgetDataTableLayout } from './i-data-table-layout.interface'

export interface IPlanWidgetOptions {
  locale?: string | null | undefined

  selection?: SelectionMode | null | undefined
  start?: Date | null | undefined
  end?: Date | null | undefined
  workDate?: Date | null | undefined
  nonWorkingTimeVisible?: boolean | null | undefined
  resourceTableOptions?: IPlanWidgetDataTableLayout | null | undefined
  entityTableOptions?: IPlanWidgetDataTableLayout | null | undefined

  // Colors
  // pm_timescaleBackgroundColor?: string | null | undefined;
  // pm_timescaleWeekendBackgroundColor?: string | null | undefined;
  // pm_timescaleTextColor?: string | null | undefined;
  // pm_timescaleTickColor?: string | null | undefined;
  // pm_timescaleHighlightingColor?: string | null | undefined;
  // pm_tableHeaderBackgroundColor?: string | null | undefined;
  // pm_tableHeaderTextColor?: string | null | undefined;
  // pm_tableHeaderColumnSeparatorColor?: string | null | undefined;
  // pm_entitiesTableHeaderBackgroundColor?: string | null | undefined;
  // pm_entitiesTableHeaderTextColor?: string | null | undefined;
  // pm_entitiesTableHeaderColumnSeparatorColor?: string | null | undefined;

  // Events
  // onDoubleClicked?: (args: any) => void;
  // onDrag?: (args: any) => void;
  // onDrop?: (args: any) => void;
  // onShowTooltip?: (args: any) => void;
  // onShowContextMenu?: (args: any) => void;
  // onSelectionChanged?: (args: any) => void;
  // onDetermineColumnDefinitions?: (args: any) => void;
}
