export class GridSlider {
  readonly fieldLeft: HTMLDivElement
  readonly fieldMiddle: HTMLDivElement
  readonly fieldRight: HTMLDivElement

  private readonly sliderContainer: HTMLDivElement
  private readonly sliderLeft: HTMLDivElement
  private readonly sliderRight: HTMLDivElement
  
  private readonly sliderWidthPx = 5
  private minPx = 0
  private maxPx = 0
  
  private sliderLeftPx = 0
  private sliderRightPx = 0

  constructor(containerEl: HTMLElement) {
    this.sliderContainer = document.createElement('div')
    this.sliderContainer.classList.add('gs-container')

    this.fieldLeft = document.createElement('div')
    this.fieldLeft.classList.add('gs-field-left')
  
    this.sliderLeft = document.createElement('div')
    this.sliderLeft.classList.add('gs-slider-left')
    this.sliderLeft.addEventListener('mousedown', () => 
      this.registerSlide(ev => this.sliderLeftOnMouseMove(ev.pageX)))
    
    this.fieldMiddle = document.createElement('div')
    this.fieldMiddle.classList.add('gs-field-middle')

    this.sliderRight = document.createElement('div')
    this.sliderRight.classList.add('gs-slider-right')
    
    this.sliderRight.addEventListener('mousedown', () => 
      this.registerSlide(ev => this.sliderRightOnMouseMove(ev.pageX)))

    this.fieldRight = document.createElement('div')
    this.fieldRight.classList.add('gs-field-right')

    this.sliderContainer.appendChild(this.fieldLeft)
    this.sliderContainer.appendChild(this.sliderLeft)
    this.sliderContainer.appendChild(this.fieldMiddle)
    this.sliderContainer.appendChild(this.sliderRight)
    this.sliderContainer.appendChild(this.fieldRight)

    containerEl.appendChild(this.sliderContainer)

    this.sliderLeftPx = this.sliderLeft.getBoundingClientRect().left
    this.sliderRightPx = this.sliderRight.getBoundingClientRect().left
    const rect = this.sliderContainer.getBoundingClientRect()
    this.minPx = rect.left
    this.maxPx = rect.right
    
    window.addEventListener('resize', () => this.onResize())
  }

  private registerSlide(moveHandler: (ev: MouseEvent) => void): void {
    this.sliderContainer.style.cursor = 'ew-resize'
    const upHandler = (): void => {
      this.sliderContainer.style.cursor = 'auto'
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('mouseup', upHandler)
    }
    window.addEventListener('mousemove', moveHandler)
    window.addEventListener('mouseup', upHandler)
  }

  private sliderLeftOnMouseMove(pageX: number): void {
    const pXl = pageX - this.minPx, pXr = pXl + this.sliderWidthPx
    if (pXl >= this.minPx && pXr <= (this.maxPx - this.sliderWidthPx)) {
      this.moveSliderLeftTo(pXl, pXr)
      if (this.sliderLeftPx >= this.sliderRightPx) this.moveSliderRightTo(
        pXl + this.sliderWidthPx, pXr + this.sliderWidthPx)
    }
  }

  private sliderRightOnMouseMove(pageX: number): void {
    const pXl = pageX - this.minPx, pXr = pXl + this.sliderWidthPx
    if ((pXl >= this.minPx + this.sliderWidthPx) && pXr <= this.maxPx) {
      this.moveSliderRightTo(pXl, pXr)
      if (this.sliderRightPx <= this.sliderLeftPx) this.moveSliderLeftTo(
        pXl - this.sliderWidthPx, pXr - this.sliderWidthPx)
    }
  }

  private moveSliderLeftTo(pXl: number, pXr: number): void {
    this.sliderLeftPx = pXl
    this.fieldLeft.style.width = this.sliderLeft.style.left = `${pXl}px`
    this.fieldMiddle.style.left = `${pXr}px`
  }

  private moveSliderRightTo(pXl: number, pXr: number): void {
    this.sliderRightPx = pXl
    this.fieldMiddle.style.right = `${(this.maxPx - pXl)}px`
    this.sliderRight.style.left = `${pXl}px`
    this.fieldRight.style.left = `${pXr}px`
  }

  private onResize(): void {
    const widthContainer = this.maxPx - this.minPx,
      sliderLeftScale = this.sliderLeftPx / widthContainer,
      sliderRightScale = this.sliderRightPx / widthContainer,
      rect = this.sliderContainer.getBoundingClientRect()
    this.minPx = rect.left
    this.maxPx = rect.right
    const newWidthContainer = this.maxPx - this.minPx
    this.sliderLeftOnMouseMove(this.minPx 
      + (newWidthContainer * sliderLeftScale))
    this.sliderRightOnMouseMove(this.minPx
      + (newWidthContainer * sliderRightScale))
  }
}