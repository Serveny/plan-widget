import { DataType } from '../enums/data-type.enum'
import { HorizontalTextAlign } from '../enums/horizontal-text-align.enum'

export interface IDataTableLayout {
  title?: string | null | undefined;
  columns?: IDataTableColumn[] | null | undefined;
  pm_symbolColumnVisible?: boolean | null | undefined;
  pm_symbolColumnWidth?: number | null | undefined;
}

export interface IPlanWidgetDataTableLayout extends IDataTableLayout {
  isEnabled?: boolean | null | undefined;
  width?: string | null | undefined;
}

export interface IDataTableColumn {
  visibleIndex: number;
  visible: boolean;

  dataField?: string | null | undefined;
  dataType?: DataType | null | undefined;
  width?: string | null | undefined;
  sortOrder?: string | null | undefined;
  sortIndex?: number | null | undefined;
  textAlign?: HorizontalTextAlign | null | undefined;
  format?: string | null | undefined;
  caption?: string | null | undefined;
}