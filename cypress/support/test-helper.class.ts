export default class TestHelper {
  static testDrag(
    el: HTMLElement,
    body: HTMLBodyElement,
    x: number,
    y: number
  ): void {
    const coords = el.getBoundingClientRect()
    el.dispatchEvent(new MouseEvent('mousedown'))
    body.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: coords.x,
        clientY: coords.y,
      })
    )
    body.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: coords.x + x,
        clientY: coords.y + y,
      })
    )
    body.dispatchEvent(new MouseEvent('mouseup'))
  }
}
