import { TimeScale } from '../../enums/time-scale.enum'

export class TsRowScales {
  get rows(): [TimeScale | undefined, 
    TimeScale | undefined,TimeScale | undefined] { 
    return [this.row1 ?? undefined,
      this.row2 ?? undefined,this.row3 ?? undefined]
  }
  constructor(
    public duration: TimeScale,
    public rowHeight: number,
    
    public row1?: TimeScale,
    public row2?: TimeScale,
    public row3?: TimeScale,
  ) {

  }
}