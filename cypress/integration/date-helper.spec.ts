import DtHlp from '../../src/www/ts/classes/date-helper.class'

describe('testing helper', () => {
  describe('testing createDiv()', () => {
    const div1 = DtHlp.ceilByScale(new Date())
    it('creates div element', () =>
      expect(div1 instanceof HTMLDivElement).eq(true))
    it('has no classes', () =>
      expect(div1?.className).eq(''))
  })
})