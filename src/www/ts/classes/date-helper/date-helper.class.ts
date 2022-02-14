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
  ) { }
}

export class DateHelper {
  dateFunctions: Map<number, ScaleFunctions>
  dateText: DateText

  constructor(private cache: CacheService) {
    this.dateText = new DateText(this.cache)
    this.dateFunctions = new Map<number, ScaleFunctions>([
      [TimeScale.years, new ScaleFunctions(
        FloorDate.floorToYear,
        NextDate.nextYear,
        this.dateText.year
      )],
      [TimeScale.quarters, new ScaleFunctions(
        FloorDate.floorToQuarter,
        NextDate.nextQuarter,
        this.dateText.quarter
      )],
      [TimeScale.months, new ScaleFunctions(
        FloorDate.floorToMonth,
        NextDate.nextMonth,
        this.dateText.month
      )],
      [TimeScale.weeks, new ScaleFunctions(
        FloorDate.floorToWeek,
        NextDate.nextWeek,
        this.dateText.week
      )],
      [TimeScale.days, new ScaleFunctions(
        FloorDate.floorToDay,
        NextDate.nextDay,
        this.dateText.day
      )],
      [TimeScale.halfDays, new ScaleFunctions(
        FloorDate.floorToHalfDay,
        NextDate.nextHalfDay,
        this.dateText.day
      )],
      [TimeScale.fourthDays, new ScaleFunctions(
        FloorDate.floorToFourthDay,
        NextDate.nextFourthDay,
        this.dateText.day
      )],
      [TimeScale.eighthDays, new ScaleFunctions(
        FloorDate.floorToEighthDay,
        NextDate.nextEighthDay,
        this.dateText.day
      )],
      [TimeScale.twelfthDays, new ScaleFunctions(
        FloorDate.floorToTwelfthDay,
        NextDate.nextTwelfthDay,
        this.dateText.day
      )],
      [TimeScale.hours, new ScaleFunctions(
        FloorDate.floorToHour,
        NextDate.nextHour,
        this.dateText.day
      )],
      [TimeScale.halfHours, new ScaleFunctions(
        FloorDate.floorToHalfHour,
        NextDate.nextHalfHour,
        this.dateText.day
      )],
      [TimeScale.fourthHours, new ScaleFunctions(
        FloorDate.floorToFourthHour,
        NextDate.nextFourthHour,
        this.dateText.day
      )],
      [TimeScale.sixthHours, new ScaleFunctions(
        FloorDate.floorToSixthHour,
        NextDate.nextSixthHour,
        this.dateText.day
      )],
      [TimeScale.twelfthHours, new ScaleFunctions(
        FloorDate.floorToTwelfthHour,
        NextDate.nextTwelfthHour,
        this.dateText.day
      )],
      [TimeScale.minutes, new ScaleFunctions(
        FloorDate.floorToMinute,
        NextDate.nextMinute,
        this.dateText.day
      )],
      [TimeScale.halfMinutes, new ScaleFunctions(
        FloorDate.floorToHalfMinute,
        NextDate.nextHalfMinute,
        this.dateText.day
      )],
      [TimeScale.fourthMinutes, new ScaleFunctions(
        FloorDate.floorToFourthMinute,
        NextDate.nextFourthMinute,
        this.dateText.day
      )],
      [TimeScale.sixthMinutes, new ScaleFunctions(
        FloorDate.floorToSixthMinute,
        NextDate.nextSixthMinute,
        this.dateText.day
      )],
      [TimeScale.twelfthMinutes, new ScaleFunctions(
        FloorDate.floorToTwelfthMinute,
        NextDate.nextTwelfthMinute,
        this.dateText.day
      )],
      [TimeScale.seconds, new ScaleFunctions(
        FloorDate.floorToSecond,
        NextDate.nextSecond,
        this.dateText.second
      )],
    ])
  }

  getDateFunctions(scale: TimeScale): ScaleFunctions {
    const fns = this.dateFunctions.get(scale)
    if (fns == null) throw `Unknown Scale: ${scale}`
    else return fns
  }
}
