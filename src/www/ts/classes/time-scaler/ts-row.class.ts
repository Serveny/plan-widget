import { TimeScale } from '../../enums/time-scale.enum'
import { EndlessScroller } from '../endless-scroller/endless-scroller.class'
import { ITimeScalerCache } from '../../interfaces/i-time-scaler-cache.interface'

export class TsRow extends EndlessScroller {
  private _isVisible = true
  private scale: TimeScale = TimeScale.none

  constructor(private cache: ITimeScalerCache) {
    super()
    this.getCellText = this.getCellTextRow
  }

  zoomByScale(x: number, scale: TimeScale | undefined,
    rowHeightPx?: number): void {
    if (scale == null) this.hide()
    else {
      this.show()
      if (rowHeightPx) this.heightPx = rowHeightPx
      this.zoom(x, this.getBlockWidth(scale,
        this.cache.focusHorizonSec))
      if (this.scale !== scale) {
        console.log('retextAllCells', TimeScale[scale])
        this.scale = scale
        this.retextAllCells()
      }
    }
  }

  show(): void {
    if (!this._isVisible) {
      this.el.style.display = ''
      this._isVisible = true
    }
  }

  hide(): void {
    if (this._isVisible) {
      this.el.style.display = 'none'
      this._isVisible = false
    }
  }

  private getBlockWidth(scale: TimeScale,
    focusHorizonSec: number): number {
    return this.el.offsetWidth / (focusHorizonSec / scale)
  }

  private getCellTextRow(cellIndex: number): string {
    // TODO: Makes no sense, only for testing
    const date = new Date(this.cache.focusStartDate.getTime()
      + (this.scale * cellIndex * 1000))
    //console.log('getCellText', date, '|', TimeScale[this.scale], '|', cellIndex)
    return this.getCellDateText(date, this.scale)
  }

  private getCellDateText(date: Date, scale: TimeScale): string {
    switch (scale) {
      case TimeScale.years: return date.getFullYear().toString()
      case TimeScale.quarters:
        return `Q ${Math.trunc((date.getMonth() / 3) + 1)}`
      case TimeScale.months:
        return this.cache.dateMonthFormat.format(date)
      case TimeScale.weeks:
      case TimeScale.days:
        return this.cache.dateDayFormat.format(date)
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
        return this.cache.dateHourMinSecFormat.format(date)
      case TimeScale.none:
        return 'No Scale'
      default: throw Error('createText: Unknown Scale')
    }
  }

  // private retextAllCells(): void {
  //   console.log(this.cells)
  //   this.cells.forEach((cell, i) => {
  //     console.log('ÄÄÄ', TimeScale[this.scale], this.getCellText)
  //     if (this.getCellText)  {
  //       console.log('gct:', this.getCellText(i))
  //       cell.text = this.getCellText(i)
  //     }
  //   })
  // }
}