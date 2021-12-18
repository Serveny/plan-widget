import { ScrollBar } from './scroll-bar.class'
import Hlp from '../helper.class'

export class ScrollBarY extends ScrollBar {
  constructor(conMargin = [0, 0], isEnabledZoom = false) {
    super(conMargin[0], conMargin[1], isEnabledZoom)
    this.conEl.classList.add('plw-sb-con-y')
    this.barEl.classList.add('plw-sb-bar-y')
  }

  protected override createResizeEls(): void {
    const resizeFieldLeft = Hlp.createDiv('plw-sb-resize-field-up'),
      resizeFieldRight = Hlp.createDiv('plw-sb-resize-field-down')
    this.barEl.append(resizeFieldLeft, resizeFieldRight)
  }

  protected override getStartPxOfEl(rect: DOMRect): number {
    return rect.top - this.conMarginStart
  }

  protected override getEndPxOfEl(rect: DOMRect): number {
    return rect.top + rect.height - this.conMarginStart
  }

  protected override getSizePxOfEl(el: HTMLElement): number {
    return el.offsetHeight
  }

  protected override drawContainer(): void {
    this.conEl.style.top = `${this.conMarginStart}px`
    this.conEl.style.bottom = `${this.conMarginEnd}px`
  }

  protected override drawBar(startPx: number, widthPx: number): void {
    this.barEl.style.marginTop = `${startPx}px`
    this.barEl.style.height = `${widthPx}px`
  }

  protected override getScrollStartPx(): number {
    return this.scrollConEl?.scrollTop ?? 0
  }

  protected override getScrollScale(): number {
    if (!this.scrollConEl || !this.contentEl)
      throw 'scroll or content el is null'
    return this.scrollConEl?.offsetHeight /
      (this.contentEl?.offsetHeight + this.contentEl.offsetTop)
  }

  protected override getXYByEv(ev: MouseEvent): number {
    return ev.pageY
  }

  protected override getScrollSize(): number {
    return this.contentEl == null ? 0
      : (this.contentEl.offsetTop + this.contentEl.offsetHeight)
  }

  protected override setScrollContentPos(): void {
    if (this.scrollConEl != null) this.scrollConEl.scrollTop =
      this._scrollConOnePctPx * this.barStartPct
  }

  protected override getWheelDelta(ev: WheelEvent): number {
    return ev.deltaY
  }

  protected override getWheelDeltaXOrY(ev: WheelEvent): number {
    return ev.deltaY == null || ev.deltaY === 0
      ? ev.deltaX : ev.deltaY
  }
}