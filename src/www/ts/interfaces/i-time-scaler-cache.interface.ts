export interface ITimeScalerCache {
  dateMonthFormat: Intl.DateTimeFormat;
  dateDayFormat: Intl.DateTimeFormat;
  dateHourFormat: Intl.DateTimeFormat;
  dateHourMinSecFormat: Intl.DateTimeFormat;

  focusStartDate: Date;
  focusEndDate: Date;
  focusHorizonSec: number;
}