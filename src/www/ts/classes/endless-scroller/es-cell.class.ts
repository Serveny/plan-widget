import Hlp from '../helper.class'

export class EsCell {
  readonly el = Hlp.createDiv('plw-es-cell')
  private _posPx = 0
  get posPx(): number { return this._posPx }
  set posPx(posPx: number) {
    this._posPx = posPx
    this.el.style.left = `${posPx}px`
  }
  set widthPx(widthPx: number) {
    this.el.style.width = `${widthPx}px`
  }
  set text(text: string) { this.el.textContent = text }
  constructor(posPx: number, widthPx: number) {
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

  setTextPos(leftPx: number): void {
    this.el.style.paddingLeft = `${leftPx}px`
  }
}