import { TimeScale } from '../../enums/time-scale.enum'
import { CacheService } from '../services/cache.service'
import { DateText } from './date-text.class'
import FloorDate from './floor-date.class'
import NextDate from './next-date.class'

export class ScaleFunctions {
  constructor(
    public floorToDate: (date: Date) => Date,
    public nextDate: (date: Date) => Date,
    public dateText: (date: Date) => string
  ) {}
}

export class DateHelper {
  dateFunctions: Map<number, ScaleFunctions>
  dateText: DateText

  constructor(private cache: CacheService) {
    this.dateText = new DateText(this.cache)
    this.dateFunctions = new Map<number, ScaleFunctions>([
      [
        TimeScale.years,
        new ScaleFunctions(
          FloorDate.floorToYear,
          NextDate.nextYear,
          this.dateText.year
        ),
      ],
      [
        TimeScale.quarters,
        new ScaleFunctions(
          FloorDate.floorToQuarter,
          NextDate.nextQuarter,
          this.dateText.quarter
        ),
      ],
      [
        TimeScale.months,
        new ScaleFunctions(
          FloorDate.floorToMonth,
          NextDate.nextMonth,
          this.dateText.month
        ),
      ],
      [
        TimeScale.weeks,
        new ScaleFunctions(
          FloorDate.floorToWeek,
          NextDate.nextWeek,
          this.dateText.week
        ),
      ],
      [
        TimeScale.days,
        new ScaleFunctions(
          FloorDate.floorToDay,
          NextDate.nextDay,
          this.dateText.day
        ),
      ],
      [
        TimeScale.halfDays,
        new ScaleFunctions(
          FloorDate.floorToHalfDay,
          NextDate.nextHalfDay,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.fourthDays,
        new ScaleFunctions(
          FloorDate.floorToFourthDay,
          NextDate.nextFourthDay,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.eighthDays,
        new ScaleFunctions(
          FloorDate.floorToEighthDay,
          NextDate.nextEighthDay,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.twelfthDays,
        new ScaleFunctions(
          FloorDate.floorToTwelfthDay,
          NextDate.nextTwelfthDay,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.hours,
        new ScaleFunctions(
          FloorDate.floorToHour,
          NextDate.nextHour,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.halfHours,
        new ScaleFunctions(
          FloorDate.floorToHalfHour,
          NextDate.nextHalfHour,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.fourthHours,
        new ScaleFunctions(
          FloorDate.floorToFourthHour,
          NextDate.nextFourthHour,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.sixthHours,
        new ScaleFunctions(
          FloorDate.floorToSixthHour,
          NextDate.nextSixthHour,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.twelfthHours,
        new ScaleFunctions(
          FloorDate.floorToTwelfthHour,
          NextDate.nextTwelfthHour,
          this.dateText.hour
        ),
      ],
      [
        TimeScale.minutes,
        new ScaleFunctions(
          FloorDate.floorToMinute,
          NextDate.nextMinute,
          this.dateText.second
        ),
      ],
      [
        TimeScale.halfMinutes,
        new ScaleFunctions(
          FloorDate.floorToHalfMinute,
          NextDate.nextHalfMinute,
          this.dateText.second
        ),
      ],
      [
        TimeScale.fourthMinutes,
        new ScaleFunctions(
          FloorDate.floorToFourthMinute,
          NextDate.nextFourthMinute,
          this.dateText.second
        ),
      ],
      [
        TimeScale.sixthMinutes,
        new ScaleFunctions(
          FloorDate.floorToSixthMinute,
          NextDate.nextSixthMinute,
          this.dateText.second
        ),
      ],
      [
        TimeScale.twelfthMinutes,
        new ScaleFunctions(
          FloorDate.floorToTwelfthMinute,
          NextDate.nextTwelfthMinute,
          this.dateText.second
        ),
      ],
      [
        TimeScale.seconds,
        new ScaleFunctions(
          FloorDate.floorToSecond,
          NextDate.nextSecond,
          this.dateText.second
        ),
      ],
    ])
  }

  getDateFunctions(scale: TimeScale): ScaleFunctions {
    const fns = this.dateFunctions.get(scale)
    if (fns == null) throw `Unknown Scale: ${scale}`
    else return fns
  }
}
