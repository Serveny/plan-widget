import { TimeScale } from '../../enums/time-scale.enum'
import { TsRowScales } from './ts-row-scales.class'

export class TsRowsFocus {
  private rowHeights: number[] = []
  private rowScales: TsRowScales[] = []

  constructor(scalerHeight: number, rowMaxCount: number) {
    for (let i = 1; i < rowMaxCount; i++)
      this.rowHeights.push(scalerHeight / i)

    this.rowScales = [
      new TsRowScales(
        TimeScale.years,
        this.rowHeights[0],
        TimeScale.years
      ),
      new TsRowScales(
        TimeScale.quarters,
        this.rowHeights[1],
        TimeScale.years,
        TimeScale.quarters
      ),
      new TsRowScales(
        TimeScale.months,
        this.rowHeights[1],
        TimeScale.years,
        TimeScale.months
      ),
      new TsRowScales(
        TimeScale.weeks,
        this.rowHeights[1],
        TimeScale.months,
        TimeScale.weeks
      ),
      new TsRowScales(
        TimeScale.days,
        this.rowHeights[2],
        TimeScale.months,
        TimeScale.weeks,
        TimeScale.hours
      ),
      new TsRowScales(
        TimeScale.halfDays,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.halfDays
      ),
      new TsRowScales(
        TimeScale.fourthDays,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.fourthDays
      ),
      new TsRowScales(
        TimeScale.eighthDays,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.eighthDays
      ),
      new TsRowScales(
        TimeScale.twelfthDays,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.twelfthDays
      ),
      new TsRowScales(
        TimeScale.twelfthDays,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.twelfthDays
      ),
      new TsRowScales(
        TimeScale.twelfthDays,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.twelfthDays
      ),
      new TsRowScales(
        TimeScale.hours,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.hours
      ),
      new TsRowScales(
        TimeScale.halfHours,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.halfHours
      ),
      new TsRowScales(
        TimeScale.fourthHours,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.fourthHours
      ),
      new TsRowScales(
        TimeScale.sixthHours,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.sixthHours
      ),
      new TsRowScales(
        TimeScale.twelfthHours,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.twelfthHours
      ),
      new TsRowScales(
        TimeScale.halfMinutes,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.halfMinutes
      ),
      new TsRowScales(
        TimeScale.fourthMinutes,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.fourthMinutes
      ),
      new TsRowScales(
        TimeScale.sixthMinutes,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.sixthMinutes
      ),
      new TsRowScales(
        TimeScale.twelfthMinutes,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.twelfthMinutes
      ),
      new TsRowScales(
        TimeScale.seconds,
        this.rowHeights[1],
        TimeScale.days,
        TimeScale.seconds
      ),
    ]
  }

  getRowScales(durationSec: number): TsRowScales {
    durationSec /= 4
    return (
      this.rowScales.find(rs => rs.duration < durationSec) ??
      this.rowScales[this.rowScales.length - 1]
    )
  }
}
