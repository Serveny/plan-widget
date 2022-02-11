import { TimeScale } from '../../enums/time-scale.enum'

export class CanvasTsRow {
  constructor(
    public yStart: number,
    public height: number,
    public scale: TimeScale
  ) {}
}
