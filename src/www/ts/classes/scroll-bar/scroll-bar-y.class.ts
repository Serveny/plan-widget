import { ScrollBar } from './scroll-bar.class'
import Hlp from '../helper.class'

export class ScrollBarY extends ScrollBar {
  constructor(conMargin = [0,0], isEnabledZoom = false) {
    super(conMargin[0], conMargin[1], isEnabledZoom)
    this.conEl.classList.add('plw-sb-con-y')
    this.barEl.classList.add('plw-sb-bar-y')
  }

  protected override createResizeEls(): void {
    const resizeFieldLeft = Hlp.createDiv('plw-sb-resize-field-up'),
      resizeFieldRight = Hlp.createDiv('plw-sb-resize-field-down')
    this.barEl.append(resizeFieldLeft, resizeFieldRight)
  }

  protected override getStartPxOfEl(el: HTMLElement): number {
    return el.offsetTop - this.conMarginStart
  }

  protected override getEndPxOfEl(el: HTMLElement): number {
    return el.offsetTop + el.offsetHeight - this.conMarginStart
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

  protected override getContentElPosPct(): number[] {
    if (this.contentEl == null || this.scrollConEl == null) 
      throw new Error('Container elements are not binded')
    return [
      this.contentEl.scrollTop / this.scrollConEl.offsetHeight, 
      (this.scrollConEl.offsetHeight / this.contentEl.offsetHeight) * 100, 
    ]
  }

  protected override getXYByEv(ev: MouseEvent): number {
    return ev.y
  }

  protected override getScrollSize(): number {
    return this.contentEl?.offsetHeight ?? 0
  }

  protected override setScrollContentPos(): void {
    if (this.scrollConEl != null) this.scrollConEl.scrollTop = 
      this._scrollConOnePctPx * this.barStartPct
  }
}