import DtHlp from '../../src/www/ts/classes/date-helper.class'

describe('testing date helper', () => {
  const date = new Date(2015, 5, 10)
  describe(`testing ceilDate: ${date}`, () => {
    it('ceils to year', () =>
      expect(DtHlp.ceilToYear(date).getTime())
        .eq(new Date(2015, 0, 1).getTime()))
    it('ceils to quarter', () =>
      expect(DtHlp.ceilToQuarter(date))
        .eq(new Date(2015, 3, 0)))
  })
})