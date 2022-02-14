import { CacheService } from '../services/cache.service'

export class DateText {
  constructor(public cache: CacheService) { }
  year(date: Date): string {
    return date.getFullYear().toString()
  }
  quarter(date: Date): string {
    return `Q ${Math.ceil((date.getMonth() + 1) / 3)}`
  }
  month(date: Date): string {
    return this.cache.dateMonthFormat.format(date)
  }
  week(date: Date): string {
    return `W ${date.getUTCDay()}`
  }
  day(date: Date): string {
    return this.cache.dateDayFormat.format(date)
  }
  second(date: Date): string {
    return this.cache.dateHourMinSecFormat.format(date)
  }
}