export default class NextDate {
  static nextYear(date: Date): Date {
    return new Date(date.getFullYear() + 1, 0, 1)
  }
  static nextQuarter(date: Date): Date {
    const month = date.getMonth()
    return new Date(date.getFullYear(), month - (month % 3) + 3, 1)
  }
  static nextMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
  }
  static nextWeek(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + 8
    )
  }
  static nextDay(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    )
  }
  private static nextDayPart(date: Date, divisor: number): Date {
    const hours = date.getHours()
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours - (hours % divisor) + divisor
    )
  }
  static nextHalfDay(date: Date): Date {
    return NextDate.nextDayPart(date, 12)
  }
  static nextFourthDay(date: Date): Date {
    return NextDate.nextDayPart(date, 6)
  }
  static nextEighthDay(date: Date): Date {
    return NextDate.nextDayPart(date, 3)
  }
  static nextTwelfthDay(date: Date): Date {
    return NextDate.nextDayPart(date, 2)
  }
  static nextHour(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours() + 1
    )
  }
  private static nextHourPart(date: Date, divisor: number): Date {
    const minutes = date.getMinutes()
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      minutes - (minutes % divisor) + divisor
    )
  }
  static nextHalfHour(date: Date): Date {
    return NextDate.nextHourPart(date, 30)
  }
  static nextFourthHour(date: Date): Date {
    return NextDate.nextHourPart(date, 15)
  }
  static nextSixthHour(date: Date): Date {
    return NextDate.nextHourPart(date, 10)
  }
  static nextTwelfthHour(date: Date): Date {
    return NextDate.nextHourPart(date, 5)
  }
  static nextMinute(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes() + 1
    )
  }
  private static nextMinutePart(date: Date, divisor: number): Date {
    const seconds = date.getSeconds()
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      seconds - (seconds % divisor) + divisor
    )
  }
  static nextHalfMinute(date: Date): Date {
    return NextDate.nextMinutePart(date, 30)
  }
  static nextFourthMinute(date: Date): Date {
    return NextDate.nextMinutePart(date, 15)
  }
  static nextSixthMinute(date: Date): Date {
    return NextDate.nextMinutePart(date, 10)
  }
  static nextTwelfthMinute(date: Date): Date {
    return NextDate.nextMinutePart(date, 5)
  }
  static nextSecond(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds() + 1
    )
  }
}
