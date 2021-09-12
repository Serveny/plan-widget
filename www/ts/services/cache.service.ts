export class CacheService {
  lang = navigator.language;
  dateMonthFormat = new Intl.DateTimeFormat(this.lang, { month: 'short'});
  dateDayFormat = new Intl.DateTimeFormat(this.lang, { day: 'numeric' });
  dateHourFormat = new Intl.DateTimeFormat(this.lang, { hour: '2-digit' });
  dateHourMinSecFormat = new Intl.DateTimeFormat(this.lang, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  startDate: Date;
  endDate: Date;
  horizonSec: number;

  focusStartDate: Date;
  focusEndDate: Date;
  focusHorizonSec: number;

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.horizonSec = (this.endDate.getTime() - this.startDate.getTime()) / 1000;
    this.focusStartDate = this.startDate;
    this.focusEndDate = this.endDate;
    this.focusHorizonSec = this.horizonSec;

    console.log('cache: ', startDate, endDate, this.focusHorizonSec);
  }

  setHorizon(start: Date, end: Date) {
    this.startDate = start;
    this.endDate = end;
    this.horizonSec = (this.endDate.getTime() - this.startDate.getTime()) / 1000;
  }

  setFocus(start: Date, end: Date) {
    this.focusStartDate = start;
    this.focusEndDate = end;
    this.focusHorizonSec = (this.focusEndDate.getTime() - this.focusStartDate.getTime()) / 1000;
  }
}