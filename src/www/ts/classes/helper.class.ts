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
    //return coll as unknown as HTMLElement[]
  }
}