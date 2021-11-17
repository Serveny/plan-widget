import { HorizontalTextAlign } from '../../enums/horizontal-text-align.enum'
import { IDataTableColumn } from '../../interfaces/i-data-table-layout.interface'
import { DtCell } from './dt-cell.class'

export class DtBodyCell extends DtCell {
  constructor(text: string, col: IDataTableColumn) {
    super(col)
    this.el.classList.add('dt-body-cell')
    if (col.dataField != null) this.el.textContent = text
    if (col.textAlign != null)
      this.el.style.textAlign = HorizontalTextAlign[col.textAlign]
  }
}