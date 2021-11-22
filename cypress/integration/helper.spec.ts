import Helper from '../../src/www/ts/classes/helper.class'
describe('testing helper', () => {
  describe('testing createDiv()', () => {
    const div1 = Helper.createDiv()
    it('creates div element', () =>
      expect(div1 instanceof HTMLDivElement).eq(true))
    it('has no classes', () =>
      expect(div1?.className).eq(''))

    const div2 = Helper.createDiv('test-1', 'test-2')
    it('creates div element', () =>
      expect(div1 instanceof HTMLDivElement).eq(true))
    it(`has classes 'test-1 test-2'`, () =>
      expect(div2?.className).eq('test-1 test-2'))
  })
  describe('testing isArrNullOrEmpty()', () => {
    it('returns true if undefined', () =>
      expect(Helper.isArrNullOrEmpty(undefined)).eq(true))
    it('returns true if null', () =>
      expect(Helper.isArrNullOrEmpty(null)).eq(true))
    it('returns true if empty array', () =>
      expect(Helper.isArrNullOrEmpty([])).eq(true))
    it('returns false if filled array', () =>
      expect(Helper.isArrNullOrEmpty([1])).eq(false))
  })
  describe('testing isStrNullOrEmpty()', () => {
    it('returns true if undefined', () =>
      expect(Helper.isStrNullOrEmpty(undefined)).eq(true))
    it('returns true if null', () =>
      expect(Helper.isStrNullOrEmpty(null)).eq(true))
    it('returns true if empty string', () =>
      expect(Helper.isStrNullOrEmpty('')).eq(true))
    it('returns false if filled string', () =>
      expect(Helper.isStrNullOrEmpty('test')).eq(false))
  })
  describe('testing getAsHtmlElementArr()', () => {
    it('returns empty array', () => {
      const coll = Helper.createDiv().children
      expect(Helper.getAsHtmlElementArr(coll).length).eq(0)
    })

    it('returns array with one HTMLElement', () => {
      const el = Helper.createDiv()
      el.appendChild(Helper.createDiv())
      const arr = Helper.getAsHtmlElementArr(el.children)
      expect(arr.length).eq(1)
      expect(arr.forEach).is.not.undefined
      expect(arr[0].style).is.not.undefined
    })
  })
  describe('testing orderByOrderAsc()', () => {
    it('returns empty array', () =>
      expect(Helper.orderByOrderAsc([]).length).eq(0))

    it('returns array ordered by style.order', () => {
      const orders: number[] = [5, 8, 3, 2, 1, 6, 8, 4, 9],
        els = orders.map(order => {
          const el = Helper.createDiv()
          el.style.order = order.toString()
          return el
        })

      const orderedEls = Helper.orderByOrderAsc(els)
      orderedEls.forEach((el: HTMLElement, i: number) => {
        const nextEl = orderedEls[i + 1]
        if (nextEl != null) expect(
          parseInt(nextEl.style.order) > parseInt(el.style.order))
      })
    })
  })
  describe('testing getChildrenByOrder()', () => {
    const parentEl = Helper.createDiv(), className = '.x', order = 5,
      child = Helper.createDiv('x')
    parentEl.appendChild(child)
    it('returns empty array', () =>
      expect(Helper.getChildrenByOrder(
        parentEl, className, order).length).eq(0))
    it('returns array with one element', () => {
      child.style.order = order.toString()
      expect(Helper.getChildrenByOrder(
        parentEl, className, order).length).eq(1)
    })
  })
  describe('testing createSvgElement()', () => {
    it('returns svg element', () => expect(Helper
      .createSvg('svg') instanceof SVGElement).to.be.true)
    it('returns svg line element', () => expect(Helper.
      createSvg('line') instanceof SVGLineElement).to.be.true)
  })
  describe('testing objToMap()', () => {
    it('returns svg element', () => expect(Helper
      .objToMap({ foo: 'bar' }).get('foo')).eq('bar'))
  })
  describe('testing clamp()', () => {
    const min = 0, max = 100
    it('returns 50', () => expect(Helper
      .clamp(50, min, max)).eq(50))
    it('returns 100', () => expect(Helper
      .clamp(150, min, max)).eq(100))
    it('returns 0', () => expect(Helper
      .clamp(-50, min, max)).eq(0))
  })
})