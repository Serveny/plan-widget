import Hlp from '../helper.class'

// Pct = Percent (%)
export abstract class ScrollBar {
  get start(): number { return this._barStartPct }
  get end(): number { return this._barEndPct }

  // Container
  protected readonly conEl = Hlp.createDiv('plw-sb-con')
  protected get conStartPx(): number { return this._conStartPx }
  private _conStartPx = 0
  private _conEndPx = 0
  private _conOnePctPx = 0

  // Bar
  protected readonly barEl = Hlp.createDiv('plw-scroll-bar')
  private _barStartPx = 0
  private _barStartPct = 0

  private _barEndPx = 0
  private _barEndPct = 100

  protected scrollConEl?: HTMLElement
  protected contentEl?: HTMLElement

  constructor(
    protected readonly conMarginStart: number,
    protected readonly conMarginEnd: number,
    isEnabledZoom: boolean
  ) {
    this.drawContainer()
    this.barEl.addEventListener('mousedown',
      (ev: MouseEvent): void => this.addMove(ev))
    this.conEl.appendChild(this.barEl)
    if (isEnabledZoom) this.createResizeEls()
  }

  appendTo(parentEl: HTMLElement): void {
    this.setDimensionByEl(parentEl)
    parentEl.appendChild(this.conEl)
  }

  bindBarSizeToEls(scrollConEl: HTMLElement, contentEl: HTMLElement): void {
    this.scrollConEl = scrollConEl
    this.contentEl = contentEl
    this.setSizes()
    new ResizeObserver((): void => this.setSizes())
      .observe(scrollConEl)
  }

  setBarByPct(startPct: number, endPct: number): void {
    this._barStartPct = Hlp.clamp(startPct, 0, 100)
    this._barEndPct = Hlp.clamp(endPct, 0, 100)
    this._barStartPx = this._barStartPct * this._conOnePctPx
    this._barEndPx = this._barEndPct * this._conOnePctPx
    this.drawBar(this._barStartPx, this._barEndPx - this._barStartPx)
  }

  // =======================================================

  protected abstract drawContainer(): void

  protected abstract drawBar(startPx: number, widthPx: number): void

  protected abstract getBarClickPosPxByEv(ev: MouseEvent): number

  protected abstract getStartPxByEv(ev: MouseEvent, mdLeftPx: number): number

  protected abstract getStartPxOfEl(el: HTMLElement): number

  protected abstract getEndPxOfEl(el: HTMLElement): number

  protected abstract getSizePxOfEl(el: HTMLElement): number

  protected abstract getContentElPosPct(): number[]

  protected abstract createResizeEls(): void

  // =======================================================

  private setDimensionByEl(el: HTMLElement): void {
    this.setDimension(this.getStartPxOfEl(el), this.getEndPxOfEl(el))
  }

  private setDimension(conStartPx: number, conEndPx: number): void {
    this._conStartPx = conStartPx
    this._conEndPx = conEndPx
    this._conOnePctPx = (this._conEndPx - this._conStartPx) / 100
  }

  private setSizes(): void {
    this.setDimensionByEl(this.conEl)
    this.setBarSize()
  }

  private setBarByPx(startPx: number, endPx: number): void {
    if (startPx >= this._conStartPx && endPx <= this._conEndPx) {
      this._barStartPct = this.getPctByPx(startPx)
      this._barEndPct = this.getPctByPx(endPx)
      this._barStartPx = startPx
      this._barEndPx = endPx
      this.drawBar(this._barStartPx, this._barEndPx - this._barStartPx)
    }
  }

  private addMove(mdEv: MouseEvent): void {
    const mdPosPx = this.getBarClickPosPxByEv(mdEv)
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grab'
    const moveBar = (ev: MouseEvent): void => {
      const startPx = this.getStartPxByEv(ev, mdPosPx)
      this.setBarByPx(startPx, startPx + (this._barEndPx - this._barStartPx))
    }, onMouseUp = (): void => {
      document.body.style.userSelect = 'auto'
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', moveBar)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', moveBar)
    window.addEventListener('mouseup', onMouseUp)
  }

  private getPctByPx(px: number): number {
    return px / this._conOnePctPx
  }

  private setBarSize(): void {
    const pos = this.getContentElPosPct()
    this.setBarByPct(pos[0], pos[1])
  }
}