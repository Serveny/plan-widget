import FloorDate from './date-helper/floor-date.class'

export default class Helper {
  static createDiv(...classes: string[]): HTMLDivElement {
    const el = document.createElement('div')
    classes.forEach(o => el.classList.add(o))
    return el
  }
  static isArrNullOrEmpty(
    arr: unknown[] | null | undefined
  ): boolean {
    return arr == null || arr.length <= 0
  }
  static isStrNullOrEmpty(str: string | null | undefined): boolean {
    return str == null || str === ''
  }
  static getAsHtmlElementArr(coll: HTMLCollection): HTMLElement[] {
    const elArr: HTMLElement[] = []
    for (let i = 0; i < coll.length; i++)
      elArr.push(coll[i] as HTMLElement)
    return elArr
  }
  static orderByOrderAsc(elements: HTMLElement[]): HTMLElement[] {
    return elements.sort(
      (a, b) => parseInt(a.style.order) - parseInt(b.style.order)
    )
  }
  static getChildrenByOrder(
    parentEl: HTMLElement,
    selector: string,
    order: number
  ): HTMLElement[] {
    const els: HTMLElement[] = []
    parentEl.querySelectorAll(selector).forEach(cellNode => {
      const cellEl = cellNode as HTMLElement
      if (parseInt(cellEl.style.order) === order) els.push(cellEl)
    })
    return els
  }
  static createSvg<K extends keyof SVGElementTagNameMap>(
    tagName: K
  ): SVGElementTagNameMap[K] {
    return document.createElementNS(
      'http://www.w3.org/2000/svg',
      tagName
    )
  }
  static objToMap(obj: object): Map<string, unknown> {
    return new Map<string, unknown>(Object.entries(obj))
  }
  static clamp(val: number, min: number, max: number): number {
    return val > max ? max : val < min ? min : val
  }
  static dateToPct(dt: Date, pct0Dt: Date, pct100Dt: Date): number {
    return (
      ((pct0Dt.getTime() - dt.getTime()) /
        (pct100Dt.getTime() - pct0Dt.getTime())) *
      -100
    )
  }
  static pctToDate(pct: number, pct0Dt: Date, pct100Dt: Date): Date {
    return new Date(
      Math.round(
        pct0Dt.getTime() +
          ((pct100Dt.getTime() - pct0Dt.getTime()) / 100) * pct
      )
    )
  }
  static addSecs(dt: Date, secsToAdd: number): Date {
    return new Date(dt.getTime() + secsToAdd * 1000)
  }
  static getWeekNumber(date: Date): number {
    date = FloorDate.floorToDay(date)
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7))
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
    return Math.ceil(
      ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    )
  }
}
