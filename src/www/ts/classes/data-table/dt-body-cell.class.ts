import { HorizontalTextAlign } from '../../enums/horizontal-text-align.enum'
import { IDataTableColumn } from '../../interfaces/i-data-table-layout.interface'
import { DtCell } from './dt-cell.class'

export class DtBodyCell extends DtCell {
  get text(): string { return this.el.textContent ?? '' }
  set text(text: string) { this.el.textContent = text }
  
  constructor(text: string, col: IDataTableColumn) {
    super(col)
    this.el.classList.add('dt-body-cell')
    this.el.textContent = text
    if (col.textAlign != null)
      this.el.style.textAlign = HorizontalTextAlign[col.textAlign]
  }
}