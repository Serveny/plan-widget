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
        [TimeScale.years]
      ),
      new TsRowScales(
        TimeScale.quarters,
        [TimeScale.years, TimeScale.quarters]
      ),
      new TsRowScales(
        TimeScale.months,
        [TimeScale.years, TimeScale.months]
      ),
      new TsRowScales(
        TimeScale.weeks,
        [TimeScale.months, TimeScale.weeks]
      ),
      new TsRowScales(
        TimeScale.days,
        [TimeScale.months, TimeScale.weeks, TimeScale.days]
      ),
      new TsRowScales(
        TimeScale.halfDays,
        [TimeScale.days, TimeScale.halfDays]
      ),
      new TsRowScales(
        TimeScale.fourthDays,
        [TimeScale.days, TimeScale.fourthDays]
      ),
      new TsRowScales(
        TimeScale.eighthDays,
        [TimeScale.days, TimeScale.eighthDays]
      ),
      new TsRowScales(
        TimeScale.twelfthDays,
        [TimeScale.days, TimeScale.twelfthDays]
      ),
      new TsRowScales(
        TimeScale.twelfthDays,
        [TimeScale.days, TimeScale.twelfthDays]
      ),
      new TsRowScales(
        TimeScale.twelfthDays,
        [TimeScale.days, TimeScale.twelfthDays]
      ),
      new TsRowScales(
        TimeScale.hours,
        [TimeScale.days, TimeScale.hours]
      ),
      new TsRowScales(
        TimeScale.halfHours,
        [TimeScale.days, TimeScale.halfHours]
      ),
      new TsRowScales(
        TimeScale.fourthHours,
        [TimeScale.days, TimeScale.fourthHours]
      ),
      new TsRowScales(
        TimeScale.sixthHours,
        [TimeScale.days, TimeScale.sixthHours]
      ),
      new TsRowScales(
        TimeScale.twelfthHours,
        [TimeScale.days, TimeScale.twelfthHours]
      ),
      new TsRowScales(
        TimeScale.halfMinutes,
        [TimeScale.days, TimeScale.halfMinutes]
      ),
      new TsRowScales(
        TimeScale.fourthMinutes,
        [TimeScale.days, TimeScale.fourthMinutes]
      ),
      new TsRowScales(
        TimeScale.sixthMinutes,
        [TimeScale.days, TimeScale.sixthMinutes]
      ),
      new TsRowScales(
        TimeScale.twelfthMinutes,
        [TimeScale.days, TimeScale.twelfthMinutes]
      ),
      new TsRowScales(
        TimeScale.seconds,
        [TimeScale.days, TimeScale.seconds]
      ),
    ]
  }

  getRowScales(durationSec: number): TsRowScales {
    durationSec /= 4
    return this.rowScales.find(rs => rs.duration < durationSec) ??
      this.rowScales[this.rowScales.length - 1]
  }
}
