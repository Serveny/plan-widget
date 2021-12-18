describe('testing grid slider', () => {
  const winWidth = Cypress.config('viewportWidth')

  before('visit test site', () => cy.visit('/dist/index.html'))

  describe('test left slider', () => {
    it(`drag to left`, () => {
      cy.get('.gs-slider-left').dragTo(0, null).then(sliderLEl =>
        expect(parseInt(sliderLEl.css('left'))).eq(0))
    })
    it(`drag to right`, () => {
      cy.get('.gs-slider-left').dragTo(winWidth - 10, null)
      .then(sliderLEl =>
        expect(parseInt(sliderLEl.css('left'))).eq(winWidth - 10))
      cy.get('.gs-slider-right').then(sliderREl =>
        expect(parseInt(sliderREl.css('right'))).eq(0))
    })
  })

  describe('test right slider', () => {
    it(`drag to left`, () => {
      cy.get('.gs-slider-right').dragTo(5, null).then(sliderREl =>
        expect(parseInt(sliderREl.css('right'))).eq(winWidth - 10))
      cy.get('.gs-slider-left').then(sliderREl =>
        expect(parseInt(sliderREl.css('left'))).eq(0))
    })
    it(`drag to right`, () => {
      cy.get('.gs-slider-right').dragTo(winWidth - 5, null).then(
        sliderREl => expect(parseInt(sliderREl.css('right'))).eq(0))
    })
  })
})