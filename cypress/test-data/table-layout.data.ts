import { DataType } from '../../src/www/ts/enums/data-type.enum'
import { HorizontalTextAlign } from '../../src/www/ts/enums/horizontal-text-align.enum'
import { IDataTableLayout } from '../../src/www/ts/interfaces/i-data-table-layout.interface'

const data: IDataTableLayout = {
  columns: [
    {
      visibleIndex: 1,
      visible: true,

      dataField: 'ID',
      dataType: DataType.String,
      width: '100px',
      textAlign: HorizontalTextAlign.Right,
      caption: 'Number',
    },
    {
      visibleIndex: 2,
      visible: true,

      dataField: 'Name',
      dataType: DataType.String,
      width: '300px',
      textAlign: HorizontalTextAlign.Left,
      caption: 'Name',
    },
    {
      visibleIndex: 3,
      visible: false,

      dataField: 'Desc',
      dataType: DataType.String,
      textAlign: HorizontalTextAlign.Left,
      caption: 'Description',
    }
  ]
}

export default data