import { TimeScale } from '../enums/time-scale.enum'

export default class DateHelper {
  static ceilByScale(date: Date, scale: TimeScale): Date {
    switch (scale) {
      case TimeScale.years: 
        return new Date(date.getFullYear())
      case TimeScale.quarters:
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
      default: throw Error('ceilByScale: Unknown Scale')
    }
  }

  static nextByScale(date: Date, scale: TimeScale): Date {
    switch (scale) {
      case TimeScale.years: 
        return new Date(date.getFullYear() + 1)
      case TimeScale.quarters:
      case TimeScale.months:
        return date.getMonth() === 11 
          ? new Date(date.getFullYear() + 1, 0, 1)
          : new Date(date.getFullYear(), date.getMonth() + 1, 1)
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
      default: throw Error('nextByScale: Unknown Scale')
    }
  }
}