import { ScrollBar } from './scroll-bar.class'
import Hlp from '../helper.class'

export class ScrollBarX extends ScrollBar {
  constructor(isResize: boolean, margin = [0, 0]) {
    super(margin)
    this.conEl.classList.add('plw-sb-con-x')
    this.barEl.classList.add('plw-sb-bar-x')
    if (isResize) this.createResizeEls()
  }

  private createResizeEls(): void {
    const resizeFieldLeft = Hlp.createDiv('plw-sb-resize-field-left'),
      resizeFieldRight = Hlp.createDiv('plw-sb-resize-field-right')
    this.barEl.append(resizeFieldLeft, resizeFieldRight)
  }

  protected setContainerPosByParent(parentEl: HTMLElement): void {
    this.conEl.style.left = `${this.margin[0]}px`
    this.conEl.style.right = `${this.margin[1]}px`
    this.setDimension(parentEl.offsetLeft + this.margin[0],
      parentEl.offsetWidth - this.margin[1])
  }

  setBarPct(startPct: number, endPct: number): void {
    this.barStartPct = Hlp.clamp(startPct, 0, 100)
    this.barEndPct = Hlp.clamp(endPct, 0, 100)
    this.barEl.style.marginLeft = `${this.barStartPct}%`
    this.barEl.style.width = `${this.barEndPct - this.barStartPct}%`
  }

  protected getContentElPosPct(
    scrollConEl: HTMLElement, contentEl: HTMLElement): number[] {
    return [
      contentEl.scrollLeft / scrollConEl.offsetWidth, 
      (scrollConEl.offsetWidth / contentEl.offsetWidth) * 100, 
    ]
  }
}