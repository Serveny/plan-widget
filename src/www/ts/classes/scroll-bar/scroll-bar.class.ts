import Hlp from '../helper.class'

// Pct = Percent (%)
export abstract class ScrollBar {
  get start(): number { return this._barStartPct }
  get end(): number { return this._barEndPct }
  onChangedPct?: ((startPct: number, endPct: number) => void)

  // Container
  protected readonly conEl = Hlp.createDiv('plw-sb-con')
  protected get conStartPx(): number { return this._conStartPx }
  private _conStartPx = 0
  private _conEndPx = 0
  private _conSizePx = 0
  private _conOnePctPx = 0

  // Bar
  protected readonly barEl = Hlp.createDiv('plw-scroll-bar')
  private _barSizePx = 0
  private _barStartPx = 0
  protected get barStartPct(): number { return this._barStartPct }
  private _barStartPct = 0

  private _barEndPx = 0
  protected get barEndPct(): number { return this._barEndPct }
  private _barEndPct = 100

  protected scrollConEl?: HTMLElement
  protected contentEl?: HTMLElement
  protected _scrollConOnePctPx = 0

  private moveBarClickPosPx = 0

  constructor(
    protected readonly conMarginStart: number,
    protected readonly conMarginEnd: number,
    isEnabledZoom: boolean
  ) {
    this.drawContainer()
    this.conEl.addEventListener('mousedown',
      (ev: MouseEvent): void => this.addMove(ev))
    this.conEl.addEventListener('wheel', ev => this.onConWheel(ev))
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
    this.scrollConEl.addEventListener('wheel', ev => this.onScrollConWheel(ev))
    const rsObs = new ResizeObserver((): void => this.setSizes())
    rsObs.observe(this.scrollConEl)
    rsObs.observe(this.contentEl)
  }

  setBarByPct(startPct: number, endPct: number): void {
    this._barStartPct = Hlp.clamp(startPct, 0, 100)
    this._barEndPct = Hlp.clamp(endPct, 0, 100)
    this._barStartPx = this._barStartPct * this._conOnePctPx
    this._barEndPx = this._barEndPct * this._conOnePctPx
    this._barSizePx = this._barEndPx - this._barStartPx
    this.drawBar(this._barStartPx, this._barSizePx)
    this.callOnChanged()
  }

  // =======================================================

  protected abstract drawContainer(): void

  protected abstract drawBar(startPx: number, widthPx: number): void

  protected abstract getXYByEv(ev: MouseEvent): number

  protected abstract getStartPxOfEl(rect: DOMRect): number

  protected abstract getEndPxOfEl(rect: DOMRect): number

  protected abstract getSizePxOfEl(el: HTMLElement): number

  protected abstract createResizeEls(): void

  protected abstract getScrollSize(): number

  protected abstract setScrollContentPos(): void

  protected abstract getScrollStartPx(): number

  protected abstract getScrollScale(): number

  protected abstract getWheelDelta(ev: WheelEvent): number

  protected abstract getWheelDeltaXOrY(ev: WheelEvent): number

  // =======================================================

  private setDimensionByEl(el: HTMLElement): void {
    const rect = el.getBoundingClientRect()
    this.setDimension(this.getStartPxOfEl(rect), this.getEndPxOfEl(rect))
  }

  private setDimension(conStartPx: number, conEndPx: number): void {
    this._conStartPx = conStartPx
    this._conEndPx = conEndPx
    this._conSizePx = this._conEndPx - this._conStartPx
    this._conOnePctPx = this._conSizePx / 100
  }

  private setSizes(): void {
    this.setDimensionByEl(this.conEl)
    this._scrollConOnePctPx = this.getScrollSize() / 100
    this.setBarSize()
  }

  private setBarByPx(startPx: number, endPx: number): void {
    this._barStartPx = startPx
    this._barEndPx = endPx
    this._barSizePx = this._barEndPx - this._barStartPx
    this._barStartPct = this.getPctByPx(this._barStartPx)
    this._barEndPct = this.getPctByPx(this._barEndPx)
    this.drawBar(this._barStartPx, this._barSizePx)
    this.callOnChanged()
  }

  private addMove(mdEv: MouseEvent): void {
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'default'
    this.barEl.classList.add('plw-scroll-bar-active')
    const pos = this.getXYByEv(mdEv)
    this.moveBarClickPosPx = this.getBarRelPos(pos)
    if (pos < this._conStartPx + this._barStartPx
      || pos > this._conStartPx + this._barEndPx) this.moveBarToClick(pos)
    this.moveAddEventHandler()
  }

  private getBarRelPos(pos: number): number {
    return pos - this._conStartPx - this._barStartPx
  }

  private moveAddEventHandler(): void {
    const onMu = (): void => {
      window.removeEventListener('mousemove', onMm)
      window.removeEventListener('mouseup', onMu)
      this.moveOnMouseup()
    }, onMm = (ev: MouseEvent): void => this.moveOnMousemove(ev)
    window.addEventListener('mousemove', onMm)
    window.addEventListener('mouseup', onMu)
  }

  private moveBarToClick(clickPx: number): void {
    const halfBarPx = this._barSizePx / 2, conRelPx = clickPx - this._conStartPx
    if (clickPx + halfBarPx > this._conEndPx) this.moveBarToConEnd()
    else if (clickPx - halfBarPx < this._conStartPx) this.moveBarToConStart()
    else this.setBarByPx(conRelPx - halfBarPx, conRelPx + halfBarPx)
    this.moveBarClickPosPx = this.getBarRelPos(clickPx)
  }

  private moveBarToConStart(): void {
    this.setBarByPx(0, this._barSizePx)
  }

  private moveBarToConEnd(): void {
    this.setBarByPx(this._conSizePx - this._barSizePx, this._conSizePx)
  }

  private moveOnMousemove(ev: MouseEvent): void {
    const startPx = this.getXYByEv(ev) - this.moveBarClickPosPx,
      endPx = startPx + this._barSizePx
    if (startPx < this._conStartPx) this.moveBarToConStart()
    else if (endPx > this._conEndPx) this.moveBarToConEnd()
    else this.setBarByPx(startPx - this._conStartPx, endPx - this._conStartPx)
  }

  private moveOnMouseup(): void {
    document.body.style.userSelect = 'auto'
    document.body.style.cursor = 'auto'
    this.barEl.classList.remove('plw-scroll-bar-active')
    this.moveBarClickPosPx = 0
  }

  private getPctByPx(px: number): number {
    return px / this._conOnePctPx
  }

  private setBarSize(): void {
    const startPct = this.getScrollStartPx() / this._scrollConOnePctPx
    this.setBarByPct(startPct, (this.getScrollScale() * 100) + startPct)
  }

  private callOnChanged(): void {
    this.setScrollContentPos()
    if (this.onChangedPct != null)
      this.onChangedPct(this._barStartPct, this._barEndPct)
  }

  private onConWheel(ev: WheelEvent): void {
    const delta = this.getWheelDeltaXOrY(ev), 
      additor = delta > 0 ? 5 : -5,
      newStart = this._barStartPct + additor, 
      newEnd = this._barEndPct + additor
    console.log('onConWheel', ev, delta)
    if (newStart < 0) this.moveBarToConStart()
    else if (newEnd > 100) this.moveBarToConEnd()
    else this.setBarByPct(newStart, newEnd)
  }

  private onWheel(delta: number): void {
    const additor = delta > 0 ? 5 : -5,
      newStart = this._barStartPct + additor, 
      newEnd = this._barEndPct + additor
    console.log(delta, newStart, newEnd)
    if (newStart < 0) this.moveBarToConStart()
    else if (newEnd > 100) this.moveBarToConEnd()
    else this.setBarByPct(newStart, newEnd)
  }

  private onScrollConWheel(ev: WheelEvent): void {
    const delta = this.getWheelDelta(ev)
    console.log('onScrollConWheel', ev, delta)
    if (delta !== 0) this.onWheel(delta)
  }
}