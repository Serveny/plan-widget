import { TimeScale } from '../enums/time-scale.enum';

export class TimeScalerRow {
  yStart: number;
  height: number;
  scale: TimeScale;

  constructor(yStart: number, height: number, scale: TimeScale) {
    this.yStart = yStart;
    this.height = height;
    this.scale = scale;
  }
}