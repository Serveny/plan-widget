export default class TestHelper {
  static testDrag(el: HTMLElement, x: number, y: number): void {
    const coords = el.getBoundingClientRect()
    el.dispatchEvent(new MouseEvent('mousedown'))
    el.dispatchEvent(new MouseEvent('mousemove', 
      { clientX: coords.x + x, clientY: coords.y + y }))
    el.dispatchEvent(new MouseEvent('mouseup'))
  }
}