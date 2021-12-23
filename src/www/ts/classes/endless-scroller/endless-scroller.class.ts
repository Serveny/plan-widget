import Hlp from '../helper.class'
import { EsCell } from './es-cell.class'

export class EndlessScroller {
  private el = Hlp.createDiv('plw-endless-scroller')
  private minWidthCellPx = 100
  private cellEls: EsCell[] = []

  appendTo(parentEl: HTMLElement): EndlessScroller {
    parentEl.appendChild(this.el)
    return this
  }

  paint(): EndlessScroller {
    const cellCount = this.getCellCount()
    for(let i = 0; i < cellCount; i++) {
      this.appendCell()
    }
    return this
  }

  private getCellCount(): number {
    return (this.el.offsetWidth / this.minWidthCellPx) * 3
  }

  private appendCell(): void {
    const cell = new EsCell()
    this.cellEls.push(cell)
    this.el.appendChild(cell.el)
  }
}