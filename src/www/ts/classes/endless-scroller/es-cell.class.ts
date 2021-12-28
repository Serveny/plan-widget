import Hlp from '../helper.class'

export class EsCell {
  private static i = 0
  private _posPx = 0
  get posPx(): number { return this._posPx }
  set posPx(posPx: number) {
    this._posPx = posPx
    this.el.style.left = `${posPx}px`
  }
  set widthPx(widthPx: number) {
    this.el.style.width = `${widthPx}px`
  }
  el = Hlp.createDiv('plw-es-cell')
  constructor(posPx: number, widthPx: number) {
    this.el.textContent = `${EsCell.i++}`
    this.posPx = posPx
    this.widthPx = widthPx
  }

  movePos(additorPx: number): void {
    this.posPx = this._posPx + additorPx
  }

  getEndPx(): number {
    return this._posPx + this.widthPx
  }

  setPosAndWidth(newPoxPx: number, newWidthPx: number): number {
    this.posPx = newPoxPx
    this.widthPx = newWidthPx
    return newPoxPx + newWidthPx
  }
}