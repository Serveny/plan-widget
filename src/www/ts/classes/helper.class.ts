export default class Helper {
  static createDiv(...classes: string[]): HTMLDivElement {
    const el = document.createElement('div')
    classes.forEach(o => el.classList.add(o))
    return el
  }
  static isArrNullOrEmpty(arr: unknown[] | null | undefined): boolean {
    return arr == null || arr.length <= 0
  }
}