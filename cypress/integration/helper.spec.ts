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
})