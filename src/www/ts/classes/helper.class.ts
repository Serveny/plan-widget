export default class Helper {
  static createDiv(...classes: string[]): HTMLDivElement {
    const el = document.createElement('div')
    classes.forEach(o => el.classList.add(o))
    return el
  }
  static isArrNullOrEmpty(arr: unknown[] | null | undefined): boolean {
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
    return elements.sort((a, b) =>
      parseInt(a.style.order) - parseInt(b.style.order))
  }
  static getChildrenByOrder(parentEl: HTMLElement, selector: string, 
    order: number): HTMLElement[] {
    const els: HTMLElement[] = []
    parentEl.querySelectorAll(selector).forEach(cellNode => {
      const cellEl = cellNode as HTMLElement
      if(parseInt(cellEl.style.order) === order) els.push(cellEl)
    })
    return els
  }
  static createSvg<K extends keyof SVGElementTagNameMap>(
    tagName: K): SVGElementTagNameMap[K] {
      return document.createElementNS("http://www.w3.org/2000/svg", tagName)
  }
  static objToMap(obj: object): Map<string, unknown> {
    return new Map<string, unknown>(Object.entries(obj))
  }
}