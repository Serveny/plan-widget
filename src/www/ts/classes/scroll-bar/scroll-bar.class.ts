import Hlp from '../helper.class'

export abstract class ScrollBar {
  protected readonly conEl = Hlp.createDiv('plw-sb-con')
  protected readonly barEl = Hlp.createDiv('plw-scroll-bar')
  protected conStartPx = 0
  protected conEndPx = 0
  protected onePercentPx = 0

  // Pct = Percent (%)
  protected barStartPct = 0
  protected barEndPct = 100
  
  constructor(protected margin = [0, 0]) {
    this.barEl.onmousedown = this.addMove
    this.conEl.appendChild(this.barEl)
  }

  private addMove(ev: MouseEvent): void {
    console.log(ev)
  }

  appendTo(parentEl: HTMLElement): void {
    this.setContainerPosByParent(parentEl)
    parentEl.appendChild(this.conEl)
  }

  protected abstract setContainerPosByParent(parentEl: HTMLElement): void

  setDimension(conStartPx: number, conEndPx: number): void {
    this.conStartPx = conStartPx
    this.conEndPx = conEndPx
    this.onePercentPx = (this.conEndPx - this.conStartPx) / 100
    this.setBarPct(this.barStartPct, this.barEndPct)
  }

  abstract setBarPct(startPct: number, endPct: number): void

  bindBarSizeToEls(scrollConEl: HTMLElement, contentEl: HTMLElement): void {
    this.setBarSize(scrollConEl, contentEl)
    new ResizeObserver((): void => this.setBarSize(scrollConEl, contentEl))
      .observe(scrollConEl)
  }

  private setBarSize(
    scrollConEl: HTMLElement, contentEl: HTMLElement): void {
    const pos = this.getContentElPosPct(scrollConEl, contentEl)
    this.setBarPct(pos[0], pos[1])
  }

  protected abstract getContentElPosPct(
    scrollConEl: HTMLElement, contentEl: HTMLElement): number[]
}