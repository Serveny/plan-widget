import NextDate from '../../src/www/ts/classes/date-helper/next-date.class'
import { TimeScale } from '../../src/www/ts/enums/time-scale.enum'

const
  hr = ' ************************ ',
  itExpectFn = (
    scale: TimeScale,
    nextFn: (date: Date) => Date,
    dateIn: Date,
    dateShould: Date | null
  ): void => {
    const dateOut = nextFn(dateIn),
      dateInStr = dateIn.toLocaleString(),
      scaleStr = TimeScale[scale].slice(0, -1)
    it(
      `${hr}next ${scaleStr} after ${dateInStr}${hr}
          Expected ${dateShould?.toLocaleString()}. 
          Result: ${dateOut.toLocaleString()}`,
      () => expect(
        nextFn(dateIn).getTime())
        .eq(dateShould?.getTime()))
  }
export function testNextFn(
  date: Date,
  expectedDates: { [key in keyof typeof TimeScale]: Date | null }
): Mocha.Suite {
  return describe(`testing nextDate: ${date}`,
    () => {
      itExpectFn(
        TimeScale.years,
        NextDate.nextYear,
        date,
        expectedDates.years
      )
      itExpectFn(
        TimeScale.quarters,
        NextDate.nextQuarter,
        date,
        expectedDates.quarters
      )
      itExpectFn(
        TimeScale.months,
        NextDate.nextMonth,
        date,
        expectedDates.months
      )
      itExpectFn(
        TimeScale.weeks,
        NextDate.nextWeek,
        date,
        expectedDates.weeks
      )
      itExpectFn(
        TimeScale.days,
        NextDate.nextDay,
        date,
        expectedDates.days
      )
      itExpectFn(
        TimeScale.halfDays,
        NextDate.nextHalfDay,
        date,
        expectedDates.halfDays
      )
      itExpectFn(
        TimeScale.fourthDays,
        NextDate.nextFourthDay,
        date,
        expectedDates.fourthDays
      )
      itExpectFn(
        TimeScale.eighthDays,
        NextDate.nextEighthDay,
        date,
        expectedDates.eighthDays
      )
      itExpectFn(
        TimeScale.twelfthDays,
        NextDate.nextTwelfthDay,
        date,
        expectedDates.twelfthDays
      )
      itExpectFn(
        TimeScale.hours,
        NextDate.nextHour,
        date,
        expectedDates.hours
      )
      itExpectFn(
        TimeScale.halfHours,
        NextDate.nextHalfHour,
        date,
        expectedDates.halfHours
      )
      itExpectFn(
        TimeScale.fourthHours,
        NextDate.nextFourthHour,
        date,
        expectedDates.fourthHours
      )
      itExpectFn(
        TimeScale.sixthHours,
        NextDate.nextSixthHour,
        date,
        expectedDates.sixthHours
      )
      itExpectFn(
        TimeScale.twelfthHours,
        NextDate.nextTwelfthHour,
        date,
        expectedDates.twelfthHours
      )
      itExpectFn(
        TimeScale.minutes,
        NextDate.nextMinute,
        date,
        expectedDates.minutes
      )
      itExpectFn(
        TimeScale.halfMinutes,
        NextDate.nextHalfMinute,
        date,
        expectedDates.halfMinutes
      )
      itExpectFn(
        TimeScale.fourthMinutes,
        NextDate.nextFourthMinute,
        date,
        expectedDates.fourthMinutes
      )
      itExpectFn(
        TimeScale.sixthMinutes,
        NextDate.nextSixthMinute,
        date,
        expectedDates.sixthMinutes
      )
      itExpectFn(
        TimeScale.twelfthMinutes,
        NextDate.nextTwelfthMinute,
        date,
        expectedDates.twelfthMinutes
      )
      itExpectFn(
        TimeScale.seconds,
        NextDate.nextSecond,
        date,
        expectedDates.seconds
      )
    })
}