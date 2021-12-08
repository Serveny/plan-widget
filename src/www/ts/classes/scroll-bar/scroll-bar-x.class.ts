import { ScrollBar } from './scroll-bar.class'
import Hlp from '../helper.class'

export class ScrollBarX extends ScrollBar {
  constructor(conMargin = [0, 0], isEnabledZoom = false) {
    super(conMargin[0], conMargin[1], isEnabledZoom)
    this.conEl.classList.add('plw-sb-con-x')
    this.barEl.classList.add('plw-sb-bar-x')
  }

  protected override createResizeEls(): void {
    const resizeFieldLeft = Hlp.createDiv('plw-sb-resize-field-left'),
      resizeFieldRight = Hlp.createDiv('plw-sb-resize-field-right')
    this.barEl.append(resizeFieldLeft, resizeFieldRight)
  }

  protected override getStartPxOfEl(rect: DOMRect): number {
    return rect.left - this.conMarginStart
  }

  protected override getEndPxOfEl(rect: DOMRect): number {
    return rect.left + rect.width - this.conMarginStart
  }

  protected override getSizePxOfEl(el: HTMLElement): number {
    return el.offsetWidth
  }

  protected override drawContainer(): void {
    this.conEl.style.left = `${this.conMarginStart}px`
    this.conEl.style.right = `${this.conMarginEnd}px`
  }

  protected override drawBar(startPx: number, widthPx: number): void {
    this.barEl.style.marginLeft = `${startPx}px`
    this.barEl.style.width = `${widthPx}px`
  }

  protected override getScrollStartPx(): number {
    return this.scrollConEl?.scrollLeft ?? 0
  }

  protected override getScrollScale(): number {
    if (!this.scrollConEl || !this.contentEl) throw 'scroll or content el is null'
    return this.scrollConEl?.offsetWidth / 
      (this.contentEl?.offsetWidth + this.contentEl.offsetLeft)
  }

  protected override getXYByEv(ev: MouseEvent): number {
    return ev.pageX
  }

  protected override getScrollSize(): number {
    return this.contentEl == null ? 0
      : this.contentEl.offsetLeft + this.contentEl.offsetWidth
  }

  protected override setScrollContentPos(): void {
    if (this.scrollConEl != null) this.scrollConEl.scrollLeft =
      this._scrollConOnePctPx * this.barStartPct
  }
}