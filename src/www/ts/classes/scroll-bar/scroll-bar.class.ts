import Hlp from '../helper.class'

// Pct = Percent (%)
export abstract class ScrollBar {
  get start(): number {
    return this._barStartPct
  }
  get end(): number {
    return this._barEndPct
  }
  onUserChangedPct?: (startPct: number, endPct: number) => void

  // Container
  protected readonly conEl = Hlp.createDiv('plw-sb-con')
  protected get conStartPx(): number {
    return this._conStartPx
  }
  private _conStartPx = 0
  private _conEndPx = 0
  private _conSizePx = 0
  private _conOnePctPx = 0

  // Bar
  protected readonly barEl = Hlp.createDiv('plw-scroll-bar')
  private _barSizePx = 0
  private _barStartPx = 0
  protected get barStartPct(): number {
    return this._barStartPct
  }
  private _barStartPct = 0

  private _barEndPx = 0
  protected get barEndPct(): number {
    return this._barEndPct
  }
  private _barEndPct = 100

  protected scrollConEl?: HTMLElement
  protected contentEl?: HTMLElement
  protected _scrollConOnePctPx = 0
  private _scrollScale = 0

  private moveBarClickPosPx = 0

  private barResizeStart?: HTMLDivElement
  private barResizeEnd?: HTMLDivElement

  constructor(
    protected readonly conMarginStart: number,
    protected readonly conMarginEnd: number,
    isEnabledZoom: boolean
  ) {
    this.drawContainer()
    this.conEl.addEventListener('mousedown', ev => this.addMove(ev))
    this.conEl.addEventListener('wheel', ev => this.onConWheel(ev))
    this.conEl.appendChild(this.barEl)
    if (isEnabledZoom) this.createResizeEls()
  }

  appendTo(parentEl: HTMLElement): ScrollBar {
    parentEl.appendChild(this.conEl)
    this.setDimensionByEl(this.conEl)
    this.setBarByPct(0, 100)
    return this
  }

  addResizeObserver(): ScrollBar {
    new ResizeObserver((): void => this.repaint()).observe(this.conEl)
    return this
  }

  bindBarSizeToScrollEls(
    scrollConEl: HTMLElement,
    contentEl: HTMLElement
  ): ScrollBar {
    this.scrollConEl = scrollConEl
    this.contentEl = contentEl
    this.setSizesByScrollCon()
    this.scrollConEl.addEventListener('wheel', ev =>
      this.onScrollConWheel(ev)
    )
    const rsObs = new ResizeObserver((): void =>
      this.setSizesByScrollCon()
    )
    rsObs.observe(this.scrollConEl)
    rsObs.observe(this.contentEl)
    return this
  }

  setBarByPct(startPct: number, endPct: number): void {
    this._barStartPct = Hlp.clamp(startPct, 0, 100)
    this._barEndPct = Hlp.clamp(endPct, 0, 100)
    this._barStartPx = this._barStartPct * this._conOnePctPx
    this._barEndPx = this._barEndPct * this._conOnePctPx
    this._barSizePx = this._barEndPx - this._barStartPx
    this.drawBar(this._barStartPx, this._barSizePx)
  }

  // =======================================================

  protected abstract drawContainer(): void

  protected abstract drawBar(startPx: number, widthPx: number): void

  protected abstract getXYByEv(ev: MouseEvent): number

  protected abstract getStartPxOfEl(rect: DOMRect): number

  protected abstract getEndPxOfEl(rect: DOMRect): number

  protected abstract getSizePxOfEl(el: HTMLElement): number

  protected abstract getScrollSize(): number

  protected abstract setScrollContentPos(): void

  protected abstract getScrollStartPx(): number

  protected abstract getScrollScale(): number

  protected abstract getWheelDelta(ev: WheelEvent): number

  protected abstract getWheelDeltaXOrY(ev: WheelEvent): number

  protected abstract getResizeCursor(): string

  // =======================================================

  private setDimensionByEl(el: HTMLElement): void {
    const rect = el.getBoundingClientRect()
    this.setDimension(
      this.getStartPxOfEl(rect),
      this.getEndPxOfEl(rect)
    )
  }

  private setDimension(conStartPx: number, conEndPx: number): void {
    this._conStartPx = conStartPx
    this._conEndPx = conEndPx
    this._conSizePx = this._conEndPx - this._conStartPx
    this._conOnePctPx = this._conSizePx / 100
  }

  private repaint(): void {
    this.setDimensionByEl(this.conEl)
    this.setBarByPct(this._barStartPct, this._barEndPct)
  }

  private setSizesByScrollCon(): void {
    this.setDimensionByEl(this.conEl)
    this._scrollConOnePctPx = this.getScrollSize() / 100
    this.setBarSizeByScrollCon()
  }

  private setBarByPx(startPx: number, endPx: number): void {
    this._barStartPx = startPx
    this._barEndPx = endPx
    this._barSizePx = this._barEndPx - this._barStartPx
    this._barStartPct = this.getPctByPx(this._barStartPx)
    this._barEndPct = this.getPctByPx(this._barEndPx)
    this.drawBar(this._barStartPx, this._barSizePx)
  }

  private addMove(mdEv: MouseEvent): void {
    document.body.style.userSelect = 'none'
    let cursor = this.getResizeCursor()
    this.barEl.classList.add('plw-scroll-bar-active')
    const pos = this.getXYByEv(mdEv)
    this.moveBarClickPosPx = this.getBarRelPos(pos)
    if (mdEv.target === this.barResizeStart)
      this.moveAddEventHandler(ev => this.moveBarStart(ev))
    else if (mdEv.target === this.barResizeEnd)
      this.moveAddEventHandler(ev => this.moveBarEnd(ev))
    else {
      if (mdEv.target === this.conEl) this.moveBarToClick(pos)
      this.moveAddEventHandler(ev => this.moveBar(ev))
      cursor = 'default'
    }
    document.body.style.cursor = cursor
  }

  private getBarRelPos(pos: number): number {
    return pos - this._conStartPx - this._barStartPx
  }

  private moveAddEventHandler(
    mmHandler: (ev: MouseEvent) => void
  ): void {
    const onMu = (): void => {
        window.removeEventListener('mousemove', onMm)
        window.removeEventListener('mouseup', onMu)
        this.moveOnMouseup()
      },
      onMm = (ev: MouseEvent): void => {
        mmHandler(ev)
        this.callOnUserChanged()
      }
    window.addEventListener('mousemove', onMm)
    window.addEventListener('mouseup', onMu)
  }

  private moveBarToClick(clickPx: number): void {
    const halfBarPx = this._barSizePx / 2,
      conRelPx = clickPx - this._conStartPx
    if (clickPx + halfBarPx > this._conEndPx) this.moveBarToConEnd()
    else if (clickPx - halfBarPx < this._conStartPx)
      this.moveBarToConStart()
    else this.setBarByPx(conRelPx - halfBarPx, conRelPx + halfBarPx)
    this.moveBarClickPosPx = this.getBarRelPos(clickPx)
  }

  private moveBarToConStart(): void {
    this.setBarByPx(0, this._barSizePx)
  }

  private moveBarToConEnd(): void {
    this.setBarByPx(
      this._conSizePx - this._barSizePx,
      this._conSizePx
    )
  }

  private moveBar(ev: MouseEvent): void {
    const startPx = this.getXYByEv(ev) - this.moveBarClickPosPx,
      endPx = startPx + this._barSizePx
    if (startPx < this._conStartPx) this.moveBarToConStart()
    else if (endPx > this._conEndPx) this.moveBarToConEnd()
    else
      this.setBarByPx(
        startPx - this._conStartPx,
        endPx - this._conStartPx
      )
  }

  private moveBarStart(ev: MouseEvent): void {
    const startPx = this.getXYByEv(ev) - this._conStartPx
    if (startPx <= 0) this.setBarByPx(0, this._barEndPx)
    else if (startPx >= this._barEndPx - 10)
      this.setBarByPx(this._barEndPx - 10, this._barEndPx)
    else this.setBarByPx(startPx, this._barEndPx)
  }

  private moveBarEnd(ev: MouseEvent): void {
    const endPx = this.getXYByEv(ev) - this._conStartPx
    if (endPx >= this._conSizePx)
      this.setBarByPx(this._barStartPx, this._conSizePx)
    else if (endPx <= this._barStartPx + 10)
      this.setBarByPx(this._barStartPx, this._barStartPx + 10)
    else this.setBarByPx(this._barStartPx, endPx)
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

  private setBarSizeByScrollCon(): void {
    const startPct = this.getScrollStartPx() / this._scrollConOnePctPx
    this._scrollScale = this.getScrollScale()
    this.setBarByPct(startPct, this._scrollScale * 100 + startPct)
  }

  private callOnUserChanged(): void {
    this.setScrollContentPos()
    if (this.onUserChangedPct != null)
      this.onUserChangedPct(this._barStartPct, this._barEndPct)
  }

  private onConWheel(ev: WheelEvent): void {
    const delta = this.getWheelDeltaXOrY(ev),
      newStart = this._barStartPx + delta,
      newEnd = this._barEndPx + delta
    if (newStart < 0) this.moveBarToConStart()
    else if (newEnd > this._conSizePx) this.moveBarToConEnd()
    else this.setBarByPx(newStart, newEnd)
    this.callOnUserChanged()
  }

  private onWheel(delta: number): void {
    const newStart = this._barStartPx + delta,
      newEnd = this._barEndPx + delta
    if (newStart < 0) this.moveBarToConStart()
    else if (newEnd > this._conSizePx) this.moveBarToConEnd()
    else this.setBarByPx(newStart, newEnd)
    this.callOnUserChanged()
  }

  private onScrollConWheel(ev: WheelEvent): void {
    const delta = this.getWheelDelta(ev) * this._scrollScale
    if (delta !== 0) this.onWheel(delta)
  }

  private createResizeEls(): void {
    this.barResizeStart = Hlp.createDiv('plw-sb-resize-field-start')
    this.barResizeEnd = Hlp.createDiv('plw-sb-resize-field-end')
    this.barEl.append(this.barResizeStart, this.barResizeEnd)
  }
}
