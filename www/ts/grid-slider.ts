export class GridSlider {
  private readonly fieldLeft: HTMLDivElement;
  private readonly sliderLeft: HTMLDivElement;
  private readonly fieldMiddle: HTMLDivElement;
  private readonly sliderRight: HTMLDivElement;
  private readonly fieldRight: HTMLDivElement;

  constructor(containerEl: HTMLElement) {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('gs-container');

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

    sliderContainer.appendChild(this.fieldLeft);
    sliderContainer.appendChild(this.sliderLeft);
    sliderContainer.appendChild(this.fieldMiddle);
    sliderContainer.appendChild(this.sliderRight);
    sliderContainer.appendChild(this.fieldRight);

    containerEl.appendChild(sliderContainer);
  }

  appendToLeft(el: HTMLElement) { this.fieldLeft.appendChild(el); }
  appendToMiddle(el: HTMLElement) { this.fieldMiddle.appendChild(el); }
  appendToRight(el: HTMLElement) { this.fieldRight.appendChild(el); }

  private registerSlide(moveHandler: (ev: MouseEvent) => void) {
    const upHandler = () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  }

  private sliderLeftOnMouseMove(ev: MouseEvent) {
    this.sliderLeft.style.left = `${ev.pageX}px`;
  }

  private sliderRightOnMouseMove(ev: MouseEvent) {
    console.log(ev);
  }
}