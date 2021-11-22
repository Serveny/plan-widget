import { ScrollBar } from './scroll-bar.class'
import Hlp from '../helper.class'

export class ScrollBarY extends ScrollBar {
  constructor(isResize: boolean, margin = [0, 0]) {
    super(margin)
    this.conEl.classList.add('plw-sb-con-y')
    this.barEl.classList.add('plw-sb-bar-y')
    if (isResize) this.createResizeEls()
  }

  private createResizeEls(): void {
    const resizeFieldLeft = Hlp.createDiv('plw-sb-resize-field-up'),
      resizeFieldRight = Hlp.createDiv('plw-sb-resize-field-down')
    this.barEl.append(resizeFieldLeft, resizeFieldRight)
  }

  protected setContainerPosByParent(parentEl: HTMLElement): void {
    this.conEl.style.top = `${this.margin[0]}px`
    this.conEl.style.bottom = `${this.margin[1]}px`
    this.setDimension(parentEl.offsetLeft + this.margin[0],
      parentEl.offsetHeight - this.margin[1])
  }

  setBarPct(startPct: number, endPct: number): void {
    this.barStartPct = Hlp.clamp(startPct, 0, 100)
    this.barEndPct = Hlp.clamp(endPct, 0, 100)
    this.barEl.style.marginTop = `${this.barStartPct}%`
    this.barEl.style.height = `${this.barEndPct - this.barStartPct}%`
  }

  protected getContentElPosPct(
    scrollConEl: HTMLElement, contentEl: HTMLElement): number[] {
    return [
      contentEl.scrollTop / scrollConEl.offsetHeight, 
      (scrollConEl.offsetHeight / contentEl.offsetHeight) * 100,
    ]
  }
}