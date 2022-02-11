export class GridSlider {
  readonly fieldL: HTMLDivElement
  readonly fieldM: HTMLDivElement
  readonly fieldR: HTMLDivElement

  private readonly sliderCon: HTMLDivElement
  private readonly sliderL: HTMLDivElement
  private readonly sliderR: HTMLDivElement

  // slider width in px
  private readonly sliderPx = 5
  private minPx = 0
  private maxPx = 0

  private sliderLPx = 0
  private sliderRPx = 0

  constructor(containerEl: HTMLElement) {
    this.sliderCon = document.createElement('div')
    this.sliderCon.classList.add('gs-container')

    this.fieldL = document.createElement('div')
    this.fieldL.classList.add('gs-field-left')

    this.sliderL = document.createElement('div')
    this.sliderL.classList.add('gs-slider-left')
    this.sliderL.addEventListener('mousedown', mdEv =>
      this.registerSlide(mdEv, ev => this.moveSliderL(ev.pageX))
    )

    this.fieldM = document.createElement('div')
    this.fieldM.classList.add('gs-field-middle')

    this.sliderR = document.createElement('div')
    this.sliderR.classList.add('gs-slider-right')

    this.sliderR.addEventListener('mousedown', mdEv =>
      this.registerSlide(mdEv, ev => this.moveSliderR(ev.pageX))
    )

    this.fieldR = document.createElement('div')
    this.fieldR.classList.add('gs-field-right')

    this.sliderCon.appendChild(this.fieldL)
    this.sliderCon.appendChild(this.sliderL)
    this.sliderCon.appendChild(this.fieldM)
    this.sliderCon.appendChild(this.sliderR)
    this.sliderCon.appendChild(this.fieldR)

    containerEl.appendChild(this.sliderCon)

    this.sliderLPx = this.sliderL.getBoundingClientRect().left
    this.sliderRPx = this.sliderR.getBoundingClientRect().left
    const rect = this.sliderCon.getBoundingClientRect()
    this.minPx = rect.left
    this.maxPx = rect.right

    new ResizeObserver((): void => this.onResize()).observe(
      this.sliderCon
    )
  }

  private registerSlide(
    mdEv: MouseEvent,
    moveHandler: (ev: MouseEvent) => void
  ): void {
    mdEv.preventDefault()
    this.sliderCon.style.cursor = 'ew-resize'
    const upHandler = (): void => {
      this.sliderCon.style.cursor = 'auto'
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('mouseup', upHandler)
    }
    window.addEventListener('mousemove', moveHandler)
    window.addEventListener('mouseup', upHandler)
  }

  private moveSliderL(pageX: number): void {
    const pXl = pageX - this.minPx,
      pXr = pXl + this.sliderPx
    if (pXl >= this.minPx && pXr <= this.maxPx - this.sliderPx) {
      this.moveSliderLeftTo(pXl, pXr)
      if (this.sliderLPx >= this.sliderRPx)
        this.moveSliderRightTo(
          pXl + this.sliderPx,
          pXr + this.sliderPx
        )
    }
  }

  private moveSliderR(pageX: number): void {
    const pXl = pageX - this.minPx,
      pXr = pXl + this.sliderPx
    if (pXl >= this.minPx + this.sliderPx && pXr <= this.maxPx) {
      this.moveSliderRightTo(pXl, pXr)
      if (this.sliderRPx <= this.sliderLPx)
        this.moveSliderLeftTo(
          pXl - this.sliderPx,
          pXr - this.sliderPx
        )
    }
  }

  private moveSliderLeftTo(pXl: number, pXr: number): void {
    this.sliderLPx = pXl
    this.fieldL.style.width = this.sliderL.style.left = `${pXl}px`
    this.fieldM.style.left = `${pXr}px`
  }

  private moveSliderRightTo(pXl: number, pXr: number): void {
    this.sliderRPx = pXl
    this.fieldM.style.right = `${this.maxPx - pXl}px`
    this.sliderR.style.left = `${pXl}px`
    this.fieldR.style.left = `${pXr}px`
  }

  private onResize(): void {
    const widthContainer = this.maxPx - this.minPx,
      sliderLScale = this.sliderLPx / widthContainer,
      sliderRScale = this.sliderRPx / widthContainer,
      rect = this.sliderCon.getBoundingClientRect()
    this.minPx = rect.left
    this.maxPx = rect.right
    const newWidthCon = this.maxPx - this.minPx
    this.moveSliderL(this.minPx + newWidthCon * sliderLScale)
    this.moveSliderR(this.minPx + newWidthCon * sliderRScale)
  }
}
