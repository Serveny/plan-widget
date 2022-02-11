import { TimeScale } from '../enums/time-scale.enum'

export default class DateHelper {
  static ceilByScale(date: Date, scale: TimeScale): Date {
    switch (scale) {
      case TimeScale.years:
        return this.ceilToYear(date)
      case TimeScale.quarters:
        return this.ceilToQuarter(date)
      case TimeScale.months:
        return new Date(date.getFullYear(), date.getMonth())
      case TimeScale.weeks:
      case TimeScale.days:
        return new Date(date.setHours(0, 0, 0, 0))
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
        return new Date(date.setSeconds(0))
      case TimeScale.none:
        throw Error('ceilByScale: Unknown Scale')
      default:
        throw Error('ceilByScale: Unknown Scale')
    }
  }

  static ceilToYear(date: Date): Date {
    return new Date(date.getFullYear(), 0, 0)
  }

  static ceilToQuarter(date: Date): Date {
    console.log('---', Math.ceil((date.getMonth() + 1) / 3) * 3)
    return new Date(
      date.getFullYear(),
      Math.ceil((date.getMonth() + 1) / 3) * 3
    )
  }

  static nextByScale(date: Date, scale: TimeScale): Date {
    switch (scale) {
      case TimeScale.years:
        return this.nextYear(date)
      case TimeScale.quarters:
        return this.nextQuarter(date)
      case TimeScale.months:
        return this.nextMonth(date)
      case TimeScale.weeks:
      case TimeScale.days:
        return new Date(date.setHours(0, 0, 0, 0))
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
        return new Date(date.setSeconds(0))
      case TimeScale.none:
        throw Error('nextByScale: Unknown Scale')
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
}
