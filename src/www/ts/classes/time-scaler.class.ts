import { TimeScale } from '../enums/time-scale.enum';
import { CacheService } from '../services/cache.service';
import { TimeScalerRow } from './time-scaler-row.class';

export class TimeScaler {
  readonly el: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private widthPx = 0;
  private heightPx = 0;
  private maxVisibleRowItems = 0;
  private rows: TimeScalerRow[] = [];

  constructor(private cache: CacheService) {
    this.el = document.createElement('canvas');
    this.el.style.width = '100%';
    this.el.style.height = '60px';
    const ctx = this.el.getContext('2d');
    if (ctx == null) throw '[TimeScale] No canvas context';
    this.ctx = ctx;
    window.addEventListener('resize', () => this.paint());
  }

  paint(): void {
    const rect = this.el.getBoundingClientRect();
    this.widthPx = rect.width;
    this.maxVisibleRowItems = this.widthPx / 120;
    this.heightPx = rect.height;
    this.ctx.canvas.width = this.widthPx;
    this.ctx.canvas.height = this.heightPx;
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = "left";
    this.rows = this.getRowsForDuration();
    this.rows.forEach(row => this.drawRow(row));
  }

  private drawRow(row: TimeScalerRow): void {
    const countBlocks = this.cache.focusHorizonSec / row.scale;
    const blockWidthPx = this.widthPx / countBlocks;
    
    this.ctx.beginPath();
    this.ctx.moveTo(0, row.yStart + row.height); 
    this.ctx.lineTo(this.widthPx, row.yStart + row.height);
    this.ctx.stroke();

    const endTime = this.cache.endDate.getTime() / 1000;
    let currentTime = this.cache.startDate.getTime() / 1000;
    let currentPx = row.scale - (currentTime % row.scale);
    this.ctx.font = `${row.height / 2}px sans-serif`;

    do {
      const text = this.getText(new Date(currentTime*1000), row.scale);
      //console.log(currentTime, currentPx, text);
      this.drawBlock(row, currentPx, blockWidthPx, text);
      currentTime += row.scale;
      currentPx += blockWidthPx;
    } while (currentTime < endTime);
  }

  private drawBlock(row: TimeScalerRow, xStart: number, width: number, text: string): void {
    this.ctx.beginPath();
    this.ctx.moveTo(xStart, row.yStart); 
    this.ctx.lineTo(xStart, row.yStart + row.height);
    this.ctx.stroke();
    //this.ctx.strokeRect(xStart, row.yStart, width, row.height);
    const xStartText = xStart < 0 ? 0 : xStart;
    console.log(text, xStart, xStartText);
    this.ctx.fillText(text, xStartText + 3, row.yStart + row.height - 6, width);
  }

  private getRowsToDraw(row1Scale: TimeScale, row2Scale?: TimeScale, row3Scale?: TimeScale): TimeScalerRow[] {
    const heightRow = row3Scale == null 
      ? row2Scale == null ? this.heightPx 
      : this.heightPx / 2 : this.heightPx / 3;
    const rows: TimeScalerRow[] = [];
    rows.push(new TimeScalerRow(0, heightRow, row1Scale));
    if (row2Scale != null) rows.push(new TimeScalerRow(heightRow, heightRow, row2Scale));
    if (row3Scale != null) rows.push(new TimeScalerRow(heightRow * 2, heightRow, row3Scale));
    return rows;
  }

  private getRowsForDuration(): TimeScalerRow[] {
    const durationSec = this.cache.focusHorizonSec;
    const maxVisibleRowItems = this.maxVisibleRowItems;

    return durationSec <= TimeScale.seconds ? this.getRowsToDraw(TimeScale.days, TimeScale.seconds) :
      durationSec / TimeScale.twelfthMinutes <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.twelfthMinutes) :
      durationSec / TimeScale.sixthMinutes <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.sixthMinutes) :
      durationSec / TimeScale.fourthMinutes <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.fourthMinutes) :
      durationSec / TimeScale.halfMinutes <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.halfMinutes) :
      durationSec / TimeScale.minutes <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.minutes) :
      durationSec / TimeScale.twelfthHours <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.twelfthHours) :
      durationSec / TimeScale.sixthHours <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.sixthHours) :
      durationSec / TimeScale.fourthHours <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.fourthHours) :
      durationSec / TimeScale.halfHours <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.halfHours) :
      durationSec / TimeScale.hours <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.hours) :
      durationSec / TimeScale.twelfthDays <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.twelfthDays) :
      durationSec / TimeScale.eighthDays <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.eighthDays) :
      durationSec / TimeScale.fourthDays <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.fourthDays) :
      durationSec / TimeScale.halfDays <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.days, TimeScale.halfDays) :
      durationSec / TimeScale.days <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.months, TimeScale.weeks, TimeScale.hours) :
      durationSec / TimeScale.weeks <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.months, TimeScale.weeks) :
      durationSec / TimeScale.months <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.years, TimeScale.months) :
      durationSec / TimeScale.quarters <= maxVisibleRowItems ? this.getRowsToDraw(TimeScale.years, TimeScale.quarters) :
      this.getRowsToDraw(TimeScale.years);
  }

  private getText(date: Date, scale: TimeScale): string {
    switch (scale) {
      case TimeScale.years: return date.getFullYear().toString();
      case TimeScale.quarters: return `Q ${Math.trunc((date.getMonth() / 3) + 1)}`;
      case TimeScale.months: return this.cache.dateMonthFormat.format(date);
      case TimeScale.weeks:
      case TimeScale.days: return this.cache.dateDayFormat.format(date);
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
      case TimeScale.seconds: return this.cache.dateHourMinSecFormat.format(date);
      default: throw Error('createText: Unknown Scale');
    }
  }
}