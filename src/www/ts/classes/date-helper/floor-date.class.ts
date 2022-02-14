export default class FloorDate {
  static floorToYear(date: Date): Date {
    return new Date(date.getFullYear(), 0, 1)
  }
  static floorToQuarter(date: Date): Date {
    const month = date.getMonth()
    return new Date(
      date.getFullYear(),
      month - (month % 3),
      1
    )
  }
  static floorToMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }
  static floorToWeek(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + 1
    )
  }
  static floorToDay(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
  }
  private static floorToDayPart(date: Date, divisor: number): Date {
    const hours = date.getHours()
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours - (hours % divisor)
    )
  }
  static floorToHalfDay(date: Date): Date {
    return FloorDate.floorToDayPart(date, 12)
  }
  static floorToFourthDay(date: Date): Date {
    return FloorDate.floorToDayPart(date, 6)
  }
  static floorToEighthDay(date: Date): Date {
    return FloorDate.floorToDayPart(date, 3)
  }
  static floorToTwelfthDay(date: Date): Date {
    return FloorDate.floorToDayPart(date, 2)
  }
  static floorToHour(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours()
    )
  }
  private static floorToHourPart(date: Date, divisor: number): Date {
    const minutes = date.getMinutes()
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      minutes - (minutes % divisor)
    )
  }
  static floorToHalfHour(date: Date): Date {
    return FloorDate.floorToHourPart(date, 30)
  }
  static floorToFourthHour(date: Date): Date {
    return FloorDate.floorToHourPart(date, 15)
  }
  static floorToSixthHour(date: Date): Date {
    return FloorDate.floorToHourPart(date, 10)
  }
  static floorToTwelfthHour(date: Date): Date {
    return FloorDate.floorToHourPart(date, 5)
  }
  static floorToMinute(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    )
  }
  private static floorToMinutePart(
    date: Date,
    divisor: number
  ): Date {
    const seconds = date.getSeconds()
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      seconds - (seconds % divisor)
    )
  }
  static floorToHalfMinute(date: Date): Date {
    return FloorDate.floorToMinutePart(date, 30)
  }
  static floorToFourthMinute(date: Date): Date {
    return FloorDate.floorToMinutePart(date, 15)
  }
  static floorToSixthMinute(date: Date): Date {
    return FloorDate.floorToMinutePart(date, 10)
  }
  static floorToTwelfthMinute(date: Date): Date {
    return FloorDate.floorToMinutePart(date, 5)
  }
  static floorToSecond(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  }
}