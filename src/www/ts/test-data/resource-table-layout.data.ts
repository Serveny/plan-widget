import { DataType } from '../enums/data-type.enum'
import { HorizontalTextAlign } from '../enums/horizontal-text-align.enum'
import { IDataTableLayout } from '../interfaces/i-data-table-layout.interface'

const layout: IDataTableLayout = {
  columns: [
    {
      visibleIndex: 2,
      visible: true,

      dataField: 'ID',
      dataType: DataType.String,
      width: '100px',
      textAlign: HorizontalTextAlign.Right,
      caption: 'Number',
      isSortable: true,
      sortIndex: 1,
      sortOrder: 'asc'
    },
    {
      visibleIndex: 1,
      visible: true,

      dataField: 'Name',
      dataType: DataType.String,
      width: '150px',
      textAlign: HorizontalTextAlign.Left,
      caption: 'Name',
      isSortable: true,
      sortIndex: 2,
      sortOrder: 'desc'
    },
    {
      visibleIndex: 3,
      visible: true,
      width: '300px',
      dataField: 'Desc',
      dataType: DataType.String,
      textAlign: HorizontalTextAlign.Left,
      caption: 'Description',
      isSortable: false,
    },
    {
      visibleIndex: 4,
      visible: true,

      dataField: 'Amount',
      dataType: DataType.Number,
      width: '80px',
      textAlign: HorizontalTextAlign.Right,
      caption: 'Amount of Things',
    }
  ]
}

export default layout