import { TimeScale } from '../../enums/time-scale.enum'

export class TsRowScales {
  rowHeight: number
  constructor(
    public duration: TimeScale,
    public rows: TimeScale[]
  ) {
    this.rowHeight = 60 / this.rows.length
  }
}
