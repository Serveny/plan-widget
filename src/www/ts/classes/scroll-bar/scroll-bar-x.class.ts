import { ScrollBar } from './scroll-bar.class'
import Hlp from '../helper.class'

export class ScrollBarX extends ScrollBar {
  constructor(conMargin = [0,0], isEnabledZoom = false) {
    super(conMargin[0], conMargin[1], isEnabledZoom)
    this.conEl.classList.add('plw-sb-con-x')
    this.barEl.classList.add('plw-sb-bar-x')
  }

  protected createResizeEls(): void {
    const resizeFieldLeft = Hlp.createDiv('plw-sb-resize-field-left'),
      resizeFieldRight = Hlp.createDiv('plw-sb-resize-field-right')
    this.barEl.append(resizeFieldLeft, resizeFieldRight)
  }

  protected getStartPxOfEl(el: HTMLElement): number {
    return el.offsetLeft - this.conMarginStart
  }

  protected getEndPxOfEl(el: HTMLElement): number {
    return el.offsetLeft + el.offsetWidth - this.conMarginStart
  }

  protected getSizePxOfEl(el: HTMLElement): number {
    return el.offsetWidth
  }

  protected drawContainer(): void {
    this.conEl.style.left = `${this.conMarginStart}px`
    this.conEl.style.right = `${this.conMarginEnd}px`
  }

  protected drawBar(startPx: number, widthPx: number): void {
    this.barEl.style.marginLeft = `${startPx}px`
    this.barEl.style.width = `${widthPx}px`
  }

  protected getContentElPosPct(): number[] {
    if (this.contentEl == null || this.scrollConEl == null)
      throw new Error('Container elements are not binded')
    return [
      this.contentEl.scrollLeft / this.scrollConEl.offsetWidth,
      (this.scrollConEl.offsetWidth / this.contentEl.offsetWidth) * 100,
    ]
  }

  protected getBarClickPosPxByEv(ev: MouseEvent): number {
    return this.conStartPx - ev.x
  }

  protected getStartPxByEv(ev: MouseEvent, mdLeftPx: number): number {
    return ev.x - this.conStartPx + mdLeftPx
  }

  protected getScrollSize(): number {
    return this.contentEl?.offsetWidth ?? 0
  }

  protected setScrollContentPos(): void {
    if (this.scrollConEl != null) this.scrollConEl.scrollLeft = 
      this._scrollConOnePctPx * this.barStartPct
  }
}