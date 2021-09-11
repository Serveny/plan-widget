export class GridSlider {
  private readonly sliderContainer: HTMLDivElement;
  private readonly fieldLeft: HTMLDivElement;
  private readonly sliderLeft: HTMLDivElement;
  private readonly fieldMiddle: HTMLDivElement;
  private readonly sliderRight: HTMLDivElement;
  private readonly fieldRight: HTMLDivElement;

  private readonly sliderWidthPx = 5;
  private minPx = 0;
  private maxPx = 0;
  private sliderLeftPx = 0;
  private sliderRightPx = 0;

  constructor(containerEl: HTMLElement) {
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('gs-container');

    this.fieldLeft = document.createElement('div');
    this.fieldLeft.classList.add('gs-field-left');
    
    this.sliderLeft = document.createElement('div');
    this.sliderLeft.classList.add('gs-slider-left');
    this.sliderLeft.addEventListener('mousedown', () => 
      this.registerSlide(ev => this.sliderLeftOnMouseMove(ev)));
    
    this.fieldMiddle = document.createElement('div');
    this.fieldMiddle.classList.add('gs-field-middle');

    this.sliderRight = document.createElement('div');
    this.sliderRight.classList.add('gs-slider-right');
    
    this.sliderRight.addEventListener('mousedown', () => 
      this.registerSlide(ev => this.sliderRightOnMouseMove(ev)));

    this.fieldRight = document.createElement('div');
    this.fieldRight.classList.add('gs-field-right');

    this.sliderContainer.appendChild(this.fieldLeft);
    this.sliderContainer.appendChild(this.sliderLeft);
    this.sliderContainer.appendChild(this.fieldMiddle);
    this.sliderContainer.appendChild(this.sliderRight);
    this.sliderContainer.appendChild(this.fieldRight);

    containerEl.appendChild(this.sliderContainer);

    this.sliderLeftPx = this.sliderLeft.getBoundingClientRect().left;
    this.sliderRightPx = this.sliderRight.getBoundingClientRect().left;
    this.onResize();
  }

  appendToLeft(el: HTMLElement) { this.fieldLeft.appendChild(el); }
  appendToMiddle(el: HTMLElement) { this.fieldMiddle.appendChild(el); }
  appendToRight(el: HTMLElement) { this.fieldRight.appendChild(el); }

  private registerSlide(moveHandler: (ev: MouseEvent) => void) {
    this.sliderContainer.style.cursor = 'e-resize';
    const upHandler = () => {
      this.sliderContainer.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  }

  private sliderLeftOnMouseMove(ev: MouseEvent) {
    const pXl = ev.pageX;
    const pXr = pXl + this.sliderWidthPx;

    if (pXl >= this.minPx && pXr <= (this.maxPx - this.sliderWidthPx)) {
      this.moveSliderLeftTo(pXl, pXr);

      if (this.sliderLeftPx >= this.sliderRightPx) {
        this.moveSliderRightTo(pXl + this.sliderWidthPx, pXr + this.sliderWidthPx);
      }
    }
  }

  private sliderRightOnMouseMove(ev: MouseEvent) {
    const pXl = ev.pageX;
    const pXr = pXl + this.sliderWidthPx;

    if ((pXl >= this.minPx + this.sliderWidthPx) && pXr <= this.maxPx) {
      this.moveSliderRightTo(pXl, pXr);

      if (this.sliderRightPx <= this.sliderLeftPx) {
        this.moveSliderLeftTo(pXl - this.sliderWidthPx, pXr - this.sliderWidthPx);
      }
    }
  }

  private moveSliderLeftTo(pXl: number, pXr: number) {
    this.sliderLeftPx = pXl;
    this.fieldLeft.style.width = `${pXl}px`;
    this.sliderLeft.style.left = `${pXl}px`;
    this.fieldMiddle.style.left = `${pXr}px`;
  }

  private moveSliderRightTo(pXl: number, pXr: number) {
    this.sliderRightPx = pXl;
    this.fieldMiddle.style.right = `${(this.maxPx - pXl)}px`;
    this.sliderRight.style.left = `${pXl}px`;
    this.fieldRight.style.left = `${pXr}px`;
  }

  private onResize() {
    const rect = this.sliderContainer.getBoundingClientRect();
    this.minPx = rect.left;
    this.maxPx = rect.right;
  }
}