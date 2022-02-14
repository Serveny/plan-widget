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
    if (fns == null) throw 'Unknown Scale'
    else return fns
  }
  // static getDateFunctions(scale: TimeScale): ScaleFunctions {
  //   switch (scale) {
  //     case TimeScale.years:
  //       return new ScaleFunctions(
  //         FloorDate.floorToYear,
  //         NextDate.nextYear,
  //         DateText.year
  //       )
  //     case TimeScale.quarters:
  //       return new ScaleFunctions(
  //         FloorDate.floorToQuarter,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.months:
  //       return new ScaleFunctions(
  //         FloorDate.floorToMonth,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.weeks:
  //       return new ScaleFunctions(
  //         FloorDate.floorToWeek,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.days:
  //       return new ScaleFunctions(
  //         FloorDate.floorToDay,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.halfDays:
  //       return new ScaleFunctions(
  //         FloorDate.floorToHalfDay,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.fourthDays:
  //       return new ScaleFunctions(
  //         FloorDate.floorToFourthDay,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.eighthDays:
  //       return new ScaleFunctions(
  //         FloorDate.floorToEighthDay,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.twelfthDays:
  //       return new ScaleFunctions(
  //         FloorDate.floorToTwelfthDay,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.hours:
  //       return new ScaleFunctions(
  //         FloorDate.floorToHour,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.halfHours:
  //       return new ScaleFunctions(
  //         FloorDate.floorToHalfHour,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.fourthHours:
  //       return new ScaleFunctions(
  //         FloorDate.floorToFourthHour,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.sixthHours:
  //       return new ScaleFunctions(
  //         FloorDate.floorToSixthHour,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.twelfthHours:
  //       return new ScaleFunctions(
  //         FloorDate.floorToTwelfthHour,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.minutes:
  //       return new ScaleFunctions(
  //         FloorDate.floorToMinute,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.halfMinutes:
  //       return new ScaleFunctions(
  //         FloorDate.floorToHalfMinute,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.fourthMinutes:
  //       return new ScaleFunctions(
  //         FloorDate.floorToFourthMinute,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.sixthMinutes:
  //       return new ScaleFunctions(
  //         FloorDate.floorToSixthMinute,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.twelfthMinutes:
  //       return new ScaleFunctions(
  //         FloorDate.floorToTwelfthMinute,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.seconds:
  //       return new ScaleFunctions(
  //         FloorDate.floorToSecond,
  //         NextDate.nextYear,
  //         DateText.year
  //       )

  //     case TimeScale.none:
  //     default:
  //       throw Error('ceilByScale: Unknown Scale')
  //   }
  // }

  static ceilToQuarter(date: Date): Date {
    console.log('---', Math.ceil((date.getMonth() + 1) / 3) * 3)
    return new Date(
      date.getFullYear(),
      Math.ceil((date.getMonth() + 1) / 3) * 3
    )
  }

  static nextDateFn(scale: TimeScale): (date: Date) => Date {
    switch (scale) {
      case TimeScale.years:
        return this.nextYear
      case TimeScale.quarters:
        return this.nextQuarter
      case TimeScale.months:
        return this.nextMonth
      case TimeScale.weeks:
      case TimeScale.days:
      case TimeScale.halfDays:
      case TimeScale.fourthDays:
      case TimeScale.eighthDays:
      case TimeScale.twelfthDays:
      case TimeScale.hours:
      case TimeScale.halfHours:
      case TimeScale.fourthHours:
      case TimeScale.sixthHours:
      case TimeScale.twelfthHours:
      case TimeScale.minutes:
      case TimeScale.halfMinutes:
      case TimeScale.fourthMinutes:
      case TimeScale.sixthMinutes:
      case TimeScale.twelfthMinutes:
      case TimeScale.seconds:
      case TimeScale.none:
      default:
        throw Error('nextByScale: Unknown Scale')
    }
  }

  static nextYear(date: Date): Date {
    return new Date(date.setFullYear(date.getFullYear() + 1))
  }

  static nextQuarter(date: Date): Date {
    return date.getMonth() >= 9
      ? new Date(date.getFullYear() + 1, 0, 0)
      : new Date(
        date.setMonth(Math.ceil((date.getMonth() + 1) / 3) * 3)
      )
  }

  static nextMonth(date: Date): Date {
    console.log(date.getMonth())
    return date.getMonth() === 11
      ? new Date(date.getFullYear() + 1, 0, 0)
      : new Date(date.getFullYear(), date.getMonth() + 1, 1)
  }

  static dateTextYear(date: Date): string {
    return date.getFullYear().toString()
  }
}
