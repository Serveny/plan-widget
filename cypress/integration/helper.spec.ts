import Helper from '../../src/www/ts/classes/helper.class'
describe('testing helper', () => {
  describe('testing createDiv()', () => {
    const div1 = Helper.createDiv()
    it('creates div element', () => 
      expect(div1 instanceof HTMLDivElement).equal(true))
    it('has no classes', () => 
      expect(div1?.className).equal(''))

    const div2 = Helper.createDiv('test-1', 'test-2')
    it('creates div element', () => 
      expect(div1 instanceof HTMLDivElement).equal(true))
    it(`has classes 'test-1 test-2'`, () => 
      expect(div2?.className).equal('test-1 test-2'))
  })
  describe('testing isArrNullOrEmpty()', () => {
    it('returns true if undefined', () => 
      expect(Helper.isArrNullOrEmpty(undefined)).equal(true))
    it('returns true if null', () => 
      expect(Helper.isArrNullOrEmpty(null)).equal(true))
    it('returns true if empty array', () => 
      expect(Helper.isArrNullOrEmpty([])).equal(true))
    it('returns false if filled array', () => 
      expect(Helper.isArrNullOrEmpty([1])).equal(false))
  })
  describe('testing isStrNullOrEmpty()', () => {
    it('returns true if undefined', () => 
      expect(Helper.isStrNullOrEmpty(undefined)).equal(true))
    it('returns true if null', () => 
      expect(Helper.isStrNullOrEmpty(null)).equal(true))
    it('returns true if empty string', () => 
      expect(Helper.isStrNullOrEmpty('')).equal(true))
    it('returns false if filled string', () => 
      expect(Helper.isStrNullOrEmpty('test')).equal(false))
  })
})