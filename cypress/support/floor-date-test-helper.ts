import FloorDate from '../../src/www/ts/classes/date-helper/floor-date.class'
import { TimeScale } from '../../src/www/ts/enums/time-scale.enum'

const
  hr = ' ************************ ',
  itExpectFn = (
    scale: TimeScale,
    floorFn: (date: Date) => Date,
    dateIn: Date,
    dateShould: Date | null
  ): void => {
    const dateOut = floorFn(dateIn),
      dateInStr = dateIn.toLocaleString(),
      scaleStr = TimeScale[scale].slice(0, -1)
    it(
      `${hr}floors ${dateInStr} to ${scaleStr} ${hr}
          Expected ${dateShould?.toLocaleString()}. 
          Result: ${dateOut.toLocaleString()}`,
      () => expect(
        floorFn(dateIn).getTime())
        .eq(dateShould?.getTime()))
  }
export function testFloorFn(
  date: Date,
  expectedDates: { [key in keyof typeof TimeScale]: Date | null }
): Mocha.Suite {
  return describe(`testing floorDate: ${date.toLocaleString()}`,
    () => {
      itExpectFn(
        TimeScale.years,
        FloorDate.floorToYear,
        date,
        expectedDates.years
      )
      itExpectFn(
        TimeScale.quarters,
        FloorDate.floorToQuarter,
        date,
        expectedDates.quarters
      )
      itExpectFn(
        TimeScale.months,
        FloorDate.floorToMonth,
        date,
        expectedDates.months
      )
      itExpectFn(
        TimeScale.weeks,
        FloorDate.floorToWeek,
        date,
        expectedDates.weeks
      )
      itExpectFn(
        TimeScale.days,
        FloorDate.floorToDay,
        date,
        expectedDates.days
      )
      itExpectFn(
        TimeScale.halfDays,
        FloorDate.floorToHalfDay,
        date,
        expectedDates.halfDays
      )
      itExpectFn(
        TimeScale.fourthDays,
        FloorDate.floorToFourthDay,
        date,
        expectedDates.fourthDays
      )
      itExpectFn(
        TimeScale.eighthDays,
        FloorDate.floorToEighthDay,
        date,
        expectedDates.eighthDays
      )
      itExpectFn(
        TimeScale.twelfthDays,
        FloorDate.floorToTwelfthDay,
        date,
        expectedDates.twelfthDays
      )
      itExpectFn(
        TimeScale.hours,
        FloorDate.floorToHour,
        date,
        expectedDates.hours
      )
      itExpectFn(
        TimeScale.halfHours,
        FloorDate.floorToHalfHour,
        date,
        expectedDates.halfHours
      )
      itExpectFn(
        TimeScale.fourthHours,
        FloorDate.floorToFourthHour,
        date,
        expectedDates.fourthHours
      )
      itExpectFn(
        TimeScale.sixthHours,
        FloorDate.floorToSixthHour,
        date,
        expectedDates.sixthHours
      )
      itExpectFn(
        TimeScale.twelfthHours,
        FloorDate.floorToTwelfthHour,
        date,
        expectedDates.twelfthHours
      )
      itExpectFn(
        TimeScale.minutes,
        FloorDate.floorToMinute,
        date,
        expectedDates.minutes
      )
      itExpectFn(
        TimeScale.halfMinutes,
        FloorDate.floorToHalfMinute,
        date,
        expectedDates.halfMinutes
      )
      itExpectFn(
        TimeScale.fourthMinutes,
        FloorDate.floorToFourthMinute,
        date,
        expectedDates.fourthMinutes
      )
      itExpectFn(
        TimeScale.sixthMinutes,
        FloorDate.floorToSixthMinute,
        date,
        expectedDates.sixthMinutes
      )
      itExpectFn(
        TimeScale.twelfthMinutes,
        FloorDate.floorToTwelfthMinute,
        date,
        expectedDates.twelfthMinutes
      )
      itExpectFn(
        TimeScale.seconds,
        FloorDate.floorToSecond,
        date,
        expectedDates.seconds
      )
    })
}