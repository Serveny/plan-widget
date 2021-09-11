export class TimeScale {
  readonly el: HTMLCanvasElement;
  //private readonly ctx: CanvasRenderingContext2D;

  constructor() {
    this.el = document.createElement('canvas');
    this.el.style.width = '100%';
    this.el.style.height = '60px';
    const ctx = this.el.getContext("2d");
    if (ctx == null) throw '[TimeScale] No canvas context';
    ctx.fillText('test', 10, 10);

    //this.ctx = ctx;
    
  }
}